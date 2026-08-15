import React, { useState } from 'react';
import { Check, Zap, Crown, Shield, Loader } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function MembershipPlans() {
  const { user, updateUser } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [upgradingTo, setUpgradingTo] = useState<string | null>(null);

  const handleUpgrade = async (tier: 'free' | 'pro' | 'elite') => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    if (user.membershipTier === tier) return;
    
    setUpgradingTo(tier);
    try {
      const res = await fetch('/api/upgrade-membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, tier })
      });
      if (res.ok) {
        updateUser({ membershipTier: tier });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpgradingTo(null);
    }
  };
  const plans = [
    {
      name: 'Vanguard Base',
      price: 'Free',
      icon: <Shield className="w-5 h-5" />,
      features: [
        'Macro Architect Engine Access',
        'Standard Workout Routines',
        'Nutrition PDF Exports',
        'Basic Store Access'
      ],
      color: 'zinc',
      tierId: 'free',
      button: 'Start Free'
    },
    {
      name: 'Vanguard Pro',
      price: '$19.99/mo',
      icon: <Zap className="w-5 h-5" />,
      popular: true,
      features: [
        'Everything in Base',
        '1-on-1 Routine Consultation',
        'Email Plan Delivery',
        '15% Off All Supplements',
        'Early Access to New Drops'
      ],
      color: 'gold',
      tierId: 'pro',
      button: 'Upgrade to Pro'
    },
    {
      name: 'Vanguard Elite',
      price: '$49.99/mo',
      icon: <Crown className="w-5 h-5" />,
      features: [
        'Everything in Pro',
        'Elite Genetic Protocol Access',
        'Direct Coach Hotline (24/7)',
        'Free Monthly Supplement Box',
        'Private Discord Access'
      ],
      color: 'emerald',
      tierId: 'elite',
      button: 'Join the Elite'
    }
  ];

  return (
    <section id="memberships-section" className="py-24 bg-[#050505] relative overflow-hidden border-t border-zinc-900">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            Ascend Your <span className="text-gold-500 italic">Status</span>
          </h2>
          <p className="text-sm text-zinc-400 font-mono uppercase tracking-widest max-w-2xl mx-auto">
            Choose a Vanguard Protocol tier to unlock advanced features, direct coaching, and premium supplement discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 border ${
                plan.popular 
                  ? 'border-gold-500/50 bg-[#0b0b0d] shadow-[0_0_30px_rgba(212,163,89,0.15)] transform md:-translate-y-4' 
                  : 'border-zinc-800 bg-[#0a0a0a]'
              } hover:border-gold-500/30 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold-500 text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <div className={`inline-flex p-3 rounded-xl mb-6 ${
                plan.color === 'gold' ? 'bg-gold-500/10 text-gold-500' :
                plan.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' :
                'bg-zinc-800 text-white'
              }`}>
                {plan.icon}
              </div>

              <h3 className="text-xl font-display font-black text-white uppercase tracking-wider mb-2">
                {plan.name}
              </h3>
              <div className="mb-6 pb-6 border-b border-zinc-800/80">
                <span className="text-3xl font-black text-white">{plan.price}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className={`w-4 h-4 mr-3 shrink-0 ${
                      plan.color === 'gold' ? 'text-gold-500' :
                      plan.color === 'emerald' ? 'text-emerald-500' :
                      'text-zinc-500'
                    }`} />
                    <span className="text-sm text-zinc-300 font-mono">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleUpgrade(plan.tierId as 'free' | 'pro' | 'elite')}
                disabled={upgradingTo === plan.tierId || user?.membershipTier === plan.tierId}
                className={`w-full py-3 flex items-center justify-center rounded-xl font-display font-black uppercase tracking-widest text-sm transition-all duration-300 cursor-pointer ${
                user?.membershipTier === plan.tierId
                  ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                  : plan.popular 
                    ? 'bg-gold-500 text-black hover:bg-gold-400 hover:shadow-[0_0_20px_rgba(212,163,89,0.4)]'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800 hover:border-gold-500/50'
              }`}>
                {upgradingTo === plan.tierId ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : user?.membershipTier === plan.tierId ? (
                  'Current Plan'
                ) : (
                  plan.button
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
}
