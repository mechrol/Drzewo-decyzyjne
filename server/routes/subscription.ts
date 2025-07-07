import express from 'express';
import { dbRun, dbGet, dbAll } from '../database/init.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user subscription status
router.get('/status', authenticateToken, async (req, res) => {
  try {
    const subscription = await dbGet(
      `SELECT * FROM subscriptions 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT 1`,
      [req.user.userId]
    );

    if (!subscription) {
      return res.json({
        hasSubscription: false,
        status: 'none',
        message: 'No subscription found. Please subscribe to access the game.'
      });
    }

    const now = new Date();
    const endDate = new Date(subscription.end_date);
    const isActive = subscription.status === 'active' && endDate > now;

    // Grace period check (5 days)
    const gracePeriodEnd = new Date(endDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    const inGracePeriod = !isActive && now <= gracePeriodEnd;

    res.json({
      hasSubscription: true,
      status: subscription.status,
      isActive: isActive || inGracePeriod,
      startDate: subscription.start_date,
      endDate: subscription.end_date,
      nextBillingDate: subscription.end_date,
      amount: subscription.amount,
      currency: subscription.currency,
      inGracePeriod,
      gracePeriodEnd: inGracePeriod ? gracePeriodEnd.toISOString() : null
    });

  } catch (error) {
    console.error('Subscription status error:', error);
    res.status(500).json({ error: 'Failed to get subscription status' });
  }
});

// Verify Live Good subscription
router.post('/verify-livegood', authenticateToken, async (req, res) => {
  try {
    const { liveGoodSubscriptionId, transactionId } = req.body;

    if (!liveGoodSubscriptionId) {
      return res.status(400).json({ error: 'Live Good subscription ID is required' });
    }

    // In a real implementation, you would verify with Live Good API
    // For now, we'll simulate the verification
    const isValid = await verifyLiveGoodSubscription(liveGoodSubscriptionId);

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid Live Good subscription' });
    }

    // Create or update subscription
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

    const result = await dbRun(
      `INSERT INTO subscriptions 
       (user_id, live_good_subscription_id, status, start_date, end_date, amount) 
       VALUES (?, ?, 'active', ?, ?, 10.00)`,
      [req.user.userId, liveGoodSubscriptionId, startDate.toISOString(), endDate.toISOString()]
    );

    // Record payment
    await dbRun(
      `INSERT INTO payment_history 
       (user_id, subscription_id, amount, status, payment_date, live_good_transaction_id) 
       VALUES (?, ?, 10.00, 'completed', ?, ?)`,
      [req.user.userId, result.lastID, startDate.toISOString(), transactionId]
    );

    res.json({
      message: 'Subscription verified and activated successfully',
      subscription: {
        id: result.lastID,
        status: 'active',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        amount: 10.00
      }
    });

  } catch (error) {
    console.error('Live Good verification error:', error);
    res.status(500).json({ error: 'Subscription verification failed' });
  }
});

// Get payment history
router.get('/payments', authenticateToken, async (req, res) => {
  try {
    const payments = await dbAll(
      `SELECT * FROM payment_history 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [req.user.userId]
    );

    res.json({ payments });

  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({ error: 'Failed to get payment history' });
  }
});

// Mock Live Good API verification
async function verifyLiveGoodSubscription(subscriptionId: string): Promise<boolean> {
  // In a real implementation, this would make an API call to Live Good
  // For demo purposes, we'll accept any subscription ID that starts with 'LG'
  return subscriptionId.startsWith('LG') && subscriptionId.length > 5;
}

export { router as subscriptionRoutes };
