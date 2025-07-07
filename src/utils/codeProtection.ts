// Digital Rights Management (DRM) utilities
export class CodeProtection {
  // Digital watermark embedded in code
  private static readonly WATERMARK = '© 2024 Drzewo Decyzyjne Game - All Rights Reserved';
  
  // Code obfuscation markers
  private static readonly PROTECTION_MARKERS = {
    copyright: '/*! COPYRIGHT_PROTECTED */',
    license: '/*! PROPRIETARY_LICENSE */',
    trademark: '/*! TRADEMARK_PROTECTED */'
  };

  // Generate unique session fingerprint
  static generateSessionFingerprint(): string {
    const timestamp = Date.now();
    const userAgent = navigator.userAgent;
    const screenRes = `${screen.width}x${screen.height}`;
    
    return btoa(`${timestamp}-${userAgent}-${screenRes}-${this.WATERMARK}`);
  }

  // Log access attempts for legal evidence
  static logAccess(action: string, details?: any): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      details,
      fingerprint: this.generateSessionFingerprint(),
      copyright: this.WATERMARK,
      warning: 'UNAUTHORIZED ACCESS IS PROHIBITED AND LEGALLY PROSECUTED'
    };

    // Store in localStorage for evidence collection
    const logs = JSON.parse(localStorage.getItem('legal_access_logs') || '[]');
    logs.push(logEntry);
    localStorage.setItem('legal_access_logs', JSON.stringify(logs.slice(-100))); // Keep last 100 entries
  }

  // Detect potential reverse engineering attempts
  static detectReverseEngineering(): boolean {
    // Check for common debugging tools
    const devToolsOpen = window.outerHeight - window.innerHeight > 200 || 
                        window.outerWidth - window.innerWidth > 200;
    
    if (devToolsOpen) {
      this.logAccess('POTENTIAL_REVERSE_ENGINEERING_ATTEMPT', {
        windowDimensions: {
          outer: { width: window.outerWidth, height: window.outerHeight },
          inner: { width: window.innerWidth, height: window.innerHeight }
        }
      });
      return true;
    }
    
    return false;
  }

  // Anti-tampering check
  static verifyIntegrity(): boolean {
    // Simple integrity check - in production, use more sophisticated methods
    const expectedElements = ['header', 'main', 'footer'];
    const actualElements = expectedElements.filter(id => document.getElementById(id));
    
    if (actualElements.length !== expectedElements.length) {
      this.logAccess('INTEGRITY_VIOLATION', {
        expected: expectedElements,
        found: actualElements
      });
      return false;
    }
    
    return true;
  }
}

// Initialize protection on module load
CodeProtection.logAccess('MODULE_LOADED', { module: 'codeProtection.ts' });
