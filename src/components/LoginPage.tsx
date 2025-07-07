import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Users, Shield, ExternalLink, Eye, EyeOff, Lock, CreditCard, UserCheck, AlertCircle, Gamepad2, Zap, Star, FileText, Gavel } from 'lucide-react';
import { LegalFooter } from './LegalFooter';
import { LegalModal } from './LegalModal';
import { HomoHumanicusLogo } from './HomoHumanicusLogo';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: ''
  });
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'eula'>('login');
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    type: 'privacy' | 'license' | 'terms' | 'copyright' | 'security' | null;
  }>({
    isOpen: false,
    type: null
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Use a fixed username for the informational login
      await login('gameuser', formData.password, false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openLegalModal = (type: 'privacy' | 'license' | 'terms' | 'copyright' | 'security') => {
    setLegalModal({ isOpen: true, type });
  };

  const closeLegalModal = () => {
    setLegalModal({ isOpen: false, type: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Content Area */}
        <div className="flex-1 container mx-auto px-4 py-8">
          
          {/* Header with HomoHumanicus Branding */}
          <div className="text-center mb-8">
            {/* HomoHumanicus Logo */}
            <div className="mb-6">
              <HomoHumanicusLogo size="lg" variant="vertical" className="mx-auto" />
              <div className="mt-4 text-center">
                <p className="text-blue-200 text-sm font-medium">Powered by HomoHumanicus Technology</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
              <div className="relative">
                <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-400 drop-shadow-lg animate-pulse" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white drop-shadow-2xl bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                  DRZEWO DECYZYJNE
                </h1>
                <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                  <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-violet-300" />
                  <span className="text-lg sm:text-xl font-bold text-violet-300 tracking-wider">STRATEGIC GAME</span>
                </div>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-violet-100 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              🎮 Rozwijaj swoje umiejętności strategicznego myślenia poprzez optymalizację 
              rozmieszczenia czynników w różnych scenariuszach biznesowych i ekologicznych
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
            
            {/* Left Side - Requirements Information */}
            <div className="space-y-6">
              
              {/* Main Requirements Card */}
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-violet-500/30 hover:border-violet-400/50 transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-violet-500/20 rounded-xl">
                    <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-violet-300" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">WARUNKI DOSTĘPU</h2>
                </div>
                
                <p className="text-violet-100 mb-8 text-base sm:text-lg leading-relaxed font-medium">
                  🔐 Hasło do logowania zostanie przyznane po spełnieniu następujących warunków:
                </p>

                <div className="space-y-6">
                  {/* AI Tribes Requirement - Necessary Condition */}
                  <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-red-400/30 hover:border-red-300/50 transition-all duration-300 hover:scale-105">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="p-3 bg-red-500/20 rounded-xl">
                        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-red-300 flex-shrink-0" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
                          <h3 className="text-xl sm:text-2xl font-black text-white">
                            WARUNEK KONIECZNY
                          </h3>
                          <span className="px-3 py-1 bg-red-500/30 text-red-200 text-sm font-bold rounded-full">BEZPŁATNE</span>
                        </div>
                        <div className="flex items-center space-x-2 mb-4">
                          <Zap className="w-5 h-5 text-yellow-400" />
                          <span className="text-red-200 font-bold text-lg">AI TRIBES</span>
                        </div