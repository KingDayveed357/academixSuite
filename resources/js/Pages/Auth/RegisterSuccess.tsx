import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Building2, Sparkles, Copy, Check, ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeTogglerTwo from '../../components/common/ThemeTogglerTwo';

interface Props {
  tenant: {
    name: string;
    slug: string;
  };
  staff_id: string;
}

export default function RegisterSuccess({ tenant, staff_id }: Props) {
  const [copied, setCopied] = useState(false);

  const copyStaffId = () => {
    navigator.clipboard.writeText(staff_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const subdomain = `${tenant.slug}.academixsuite.com`;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-outfitSelection transition-colors duration-300 flex flex-col">
      <Head title="Registration Successful — AcademixSuite" />

      <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800/50">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-brand-600 rounded flex items-center justify-center text-white">
               <Building2 className="size-5" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">
              AcademixSuite
            </span>
          </div>
          <ThemeTogglerTwo />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 py-12 md:py-20">
        <div className="max-w-xl w-full space-y-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mx-auto size-20 rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6">
              <Sparkles className="size-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
              Registration Successful!
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Welcome to the future of school management. Your school space is ready for setup.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-8 rounded-[2.5rem] bg-brand-600 text-white shadow-2xl shadow-brand-500/30 relative overflow-hidden group text-left"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <Building2 className="size-48" />
            </div>
            
            <div className="relative z-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-6">
                Administrative Staff ID
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-5xl font-mono font-black tracking-[0.15em]">
                    {staff_id}
                  </span>
                  <p className="mt-4 text-[11px] font-medium opacity-80 flex items-center gap-2">
                    <Sparkles className="size-3" />
                    Used for every login to {tenant.name}
                  </p>
                </div>
                
                <button 
                  type="button"
                  onClick={copyStaffId}
                  className="size-14 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all flex items-center justify-center border border-white/20"
                >
                  {copied ? <Check className="size-6" /> : <Copy className="size-6" />}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center justify-center gap-3 mb-4">
                 <Globe className="size-5 text-brand-600" />
                 <span className="text-sm font-bold text-gray-900 dark:text-white">Your School Subdomain</span>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 font-mono text-lg text-brand-600 dark:text-brand-400 font-bold">
                 {subdomain}
              </div>
            </div>

            <Link
              href="/onboarding"
              className="w-full flex items-center justify-center gap-3 px-10 h-16 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black shadow-xl shadow-brand-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Set Up My School
              <ArrowRight className="size-6" />
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
