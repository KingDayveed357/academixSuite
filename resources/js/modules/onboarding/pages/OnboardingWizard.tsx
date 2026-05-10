import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
  Building2,
  Calendar,
  CreditCard,
  Globe,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../utils/cn';
import ThemeTogglerTwo from '../../../components/common/ThemeTogglerTwo';
import { useOnboarding } from '../../../hooks/useOnboarding';
import { useAuth } from '../../../hooks/useAuth';

const STEPS = [
  { id: 1, label: 'Your School', icon: Building2 },
  { id: 2, label: 'Your Setup', icon: Calendar },
  { id: 3, label: "You're Ready", icon: Sparkles },
] as const;

export default function OnboardingWizard() {
  const { form, currentStep, setCurrentStep, saveStep, complete, tenant } = useOnboarding();
  const { membership } = useAuth();

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const stepData: any = {
      wizard_step: String(currentStep)
    };
    
    if (currentStep === 1) {
      stepData.address = form.data.address;
      stepData.contact_email = form.data.contact_email;
      stepData.contact_phone = form.data.contact_phone;
    } else if (currentStep === 2) {
      stepData.academic_session = form.data.academic_session;
      stepData.currency = form.data.currency;
      stepData.fee_template = form.data.fee_template;
    }

    if (currentStep < 3) {
      saveStep(stepData, nextStep);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-outfitSelection transition-colors duration-300">
      <Head title="Set up your school — AcademixSuite" />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/50">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-brand-600 rounded flex items-center justify-center text-white">
               <Building2 className="size-5" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white hidden sm:block">
              {tenant?.name || 'AcademixSuite'}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={cn(
                    "h-1.5 w-8 rounded-full transition-all duration-500",
                    currentStep >= s.id ? "bg-brand-600" : "bg-gray-100 dark:bg-gray-800"
                  )}
                />
              ))}
            </div>
            <ThemeTogglerTwo />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* ── Sidebar Navigation (Hidden on Mobile) ────────────────────────── */}
        <div className="hidden lg:block lg:col-span-4 space-y-8">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-brand-600 dark:text-brand-400 uppercase tracking-[0.2em]">
              Onboarding
            </h2>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Let's get started.
            </h1>
          </div>

          <nav className="space-y-4">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isActive = currentStep === s.id;
              const isCompleted = currentStep > s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => s.id < currentStep && setCurrentStep(s.id)}
                  disabled={s.id > currentStep}
                  className={cn(
                    "w-full flex items-center gap-4 p-3 rounded-xl transition-all text-left",
                    isActive ? "bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400 shadow-sm" : "text-gray-400 dark:text-gray-600",
                    isCompleted && "text-emerald-600 dark:text-emerald-400"
                  )}
                >
                  <div className={cn(
                    "size-10 rounded-lg flex items-center justify-center border-2 transition-all",
                    isActive ? "border-brand-200 dark:border-brand-800 bg-white dark:bg-gray-900" : "border-transparent",
                    isCompleted && "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-800"
                  )}>
                    {isCompleted ? <Check className="size-5" /> : <Icon className="size-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{s.label}</p>
                    <p className="text-[11px] font-medium opacity-70">
                      {isActive ? 'In Progress' : isCompleted ? 'Completed' : 'Pending'}
                    </p>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800/50">
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Need help? Our implementation team is available for a 1-on-1 migration session.
            </p>
            <a href="#" className="mt-3 inline-block text-xs font-bold text-brand-600 hover:underline">
              Schedule migration call →
            </a>
          </div>
        </div>

        {/* ── Mobile Progress Indicator ─────────────────────────────────── */}
        <div className="lg:hidden space-y-4">
           <p className="text-xs font-bold text-brand-600 uppercase tracking-widest text-center">Step {currentStep} of 3</p>
           <div className="flex justify-center gap-2">
              {[1, 2, 3].map(i => (
                 <div key={i} className={cn("h-1 w-12 rounded-full", currentStep >= i ? "bg-brand-600" : "bg-gray-200 dark:bg-gray-800")} />
              ))}
           </div>
        </div>

        {/* ── Main Form Area ────────────────────────────────────────────── */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <form onSubmit={handleStepSubmit} className="space-y-8">
                
                {/* ── Step 1: Your School ────────────────────────────────── */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Your School
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Set up the basic contact details for your institution.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Contact Email</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                              type="email"
                              required
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                              placeholder="info@school.com"
                              value={form.data.contact_email}
                              onChange={e => form.setData('contact_email', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Contact Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                            <input
                              type="tel"
                              required
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                              placeholder="+234..."
                              value={form.data.contact_phone}
                              onChange={e => form.setData('contact_phone', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Physical Address</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-4 size-4 text-gray-400" />
                          <textarea
                            rows={3}
                            required
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                            placeholder="Full address for school head office..."
                            value={form.data.address}
                            onChange={e => form.setData('address', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 2: Your Setup ────────────────────────────────── */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Your Setup
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Configure your academic session and school type.
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Academic Session</label>
                         <select
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                            value={form.data.academic_session}
                            onChange={e => form.setData('academic_session', e.target.value)}
                         >
                            <option value="2024/2025">2024/2025</option>
                            <option value="2025/2026">2025/2026</option>
                            <option value="2026/2027">2026/2027</option>
                         </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Currency</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['NGN', 'USD'].map(c => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => form.setData('currency', c)}
                              className={cn(
                                "py-3 rounded-xl border-2 font-bold transition-all",
                                form.data.currency === c 
                                  ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30 text-brand-600 dark:text-brand-400" 
                                  : "border-gray-100 dark:border-gray-800 text-gray-400"
                              )}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">School Type</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                           {[
                              { id: 'standard', title: 'Primary & Secondary', desc: 'Pre-school, Primary & Secondary' },
                              { id: 'tertiary', title: 'University / Poly', desc: 'Higher learning institutions' },
                              { id: 'custom', title: 'Vocational / Other', desc: 'Specialized training centers' }
                           ].map(t => (
                              <button
                                 key={t.id}
                                 type="button"
                                 onClick={() => form.setData('fee_template', t.id)}
                                 className={cn(
                                    "p-5 rounded-2xl border-2 text-left transition-all h-full flex flex-col",
                                    form.data.fee_template === t.id
                                       ? "border-brand-500 bg-brand-50 dark:bg-brand-950/30"
                                       : "border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
                                 )}
                              >
                                 <p className={cn("font-bold text-sm mb-1", form.data.fee_template === t.id ? "text-brand-600 dark:text-brand-400" : "text-gray-900 dark:text-white")}>
                                    {t.title}
                                 </p>
                                 <p className="text-[11px] text-gray-500 leading-relaxed">{t.desc}</p>
                              </button>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Step 3: You're Ready ────────────────────────────────── */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="text-center py-10">
                      <div className="mx-auto size-24 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-8 relative">
                        <Sparkles className="size-12 text-emerald-600 dark:text-emerald-400" />
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} 
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="absolute -top-2 -right-2 bg-brand-500 text-white p-2 rounded-xl shadow-lg"
                        >
                           <Check className="size-4" />
                        </motion.div>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        You're Ready
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-md mx-auto text-lg">
                        Your configuration is complete. Welcome to your new administrative hub.
                      </p>

                      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                         <SummaryBox label="School" value={tenant?.name || '—'} />
                         <SummaryBox label="Currency" value={form.data.currency} />
                         <SummaryBox label="Session" value={form.data.academic_session} />
                         <SummaryBox label="Type" value={
                            form.data.fee_template === 'standard' ? 'K-12' : 
                            form.data.fee_template === 'tertiary' ? 'Higher Ed' : 'Custom'
                         } />
                      </div>

                      <div className="mt-10 bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-left">
                         <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Activation Checklist</h4>
                         <div className="space-y-4">
                            {[
                               "Create your first class",
                               "Add your first student",
                               "Record your first payment",
                               "Export your first report"
                            ].map((item, i) => (
                               <div key={i} className="flex items-center justify-between group opacity-50">
                                  <div className="flex items-center gap-4">
                                     <div className="size-6 rounded border border-gray-300 dark:border-gray-700 flex items-center justify-center">
                                        {/* All incomplete as per PRD */}
                                     </div>
                                     <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{item}</span>
                                  </div>
                                  <ArrowRight className="size-4 text-gray-400" />
                               </div>
                            ))}
                         </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Footer Navigation ──────────────────────────────────── */}
                <div className="pt-10 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1 || form.processing}
                    className={cn(
                      "flex items-center gap-2 px-6 h-12 rounded-2xl font-bold transition-all",
                      currentStep === 1 
                        ? "text-gray-200 dark:text-gray-800" 
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 border border-gray-100 dark:border-gray-800"
                    )}
                  >
                    <ArrowLeft className="size-5" />
                    Back
                  </button>

                  <div className="flex items-center gap-4">
                     {currentStep < 3 ? (
                        <button
                          type="submit"
                          disabled={form.processing}
                          className="flex items-center gap-2 px-10 h-12 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xl shadow-brand-600/20 transition-all disabled:opacity-50"
                        >
                          {form.processing ? 'Saving...' : 'Continue'}
                          <ArrowRight className="size-5" />
                        </button>
                     ) : (
                        <button
                          type="button"
                          onClick={complete}
                          disabled={form.processing}
                          className="flex items-center gap-3 px-12 h-14 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black shadow-2xl shadow-brand-600/30 transition-all hover:scale-105 active:scale-95"
                        >
                          <LayoutDashboard className="size-6" />
                          Go to Dashboard
                        </button>
                     )}
                  </div>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SummaryBox({ label, value }: { label: string, value: string }) {
   return (
      <div className="p-4 rounded-2xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 flex flex-col gap-1 shadow-sm">
         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
         <span className="text-xs font-bold text-gray-900 dark:text-white truncate">{value}</span>
      </div>
   );
}
