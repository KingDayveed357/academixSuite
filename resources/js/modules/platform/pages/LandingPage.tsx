import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
  ShieldCheck, 
  Wallet, 
  BarChart3, 
  Smartphone, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { cn } from '../../../utils/cn';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-brand-500/30">
      <Head title="AcademixSuite - Financial School Management for the Modern Age" />
      
      {/* Navigation */}
      <nav className="h-20 border-b border-slate-100 flex items-center justify-between px-6 lg:px-20 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <img src="/assets/logo.png" alt="AcademixSuite Logo" className="h-10 w-auto" />

        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Features</a>
          <a href="#pricing" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">Pricing</a>
          <a href="#about" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors">About</a>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-slate-900 hover:text-brand-600 transition-colors">Sign In</Link>
          <Link href="/register" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-20 pb-32 px-6 lg:px-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-brand-500/5 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 px-4 py-1.5 rounded-full text-brand-700 text-xs font-bold uppercase tracking-widest animate-fade-in">
            <Zap className="w-3 h-3 fill-current" />
            The Future of School Finance
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Manage your school with <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">financial precision.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            AcademixSuite replaces manual ledgers and fragmented Excel sheets with a robust, multi-tenant SaaS platform built for correctness and auditability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register" className="w-full sm:w-auto bg-brand-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full sm:w-auto border border-slate-200 text-slate-900 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 max-w-5xl mx-auto relative">
           <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-2 relative z-10 group overflow-hidden">
              <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 aspect-video flex items-center justify-center">
                 <div className="text-slate-300 flex flex-col items-center gap-4">
                    <Smartphone className="w-16 h-16 opacity-20" />
                    <p className="font-bold text-lg opacity-20">Device-Agnostic Dashboard Preview</p>
                 </div>
                 {/* Imagine a high-fidelity image here */}
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent group-hover:opacity-0 transition-opacity pointer-events-none"></div>
              </div>
           </div>
           {/* Decorative elements */}
           <div className="absolute -top-10 -left-10 w-24 h-24 bg-brand-200/40 rounded-3xl blur-2xl -z-10"></div>
           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-200/40 rounded-full blur-3xl -z-10"></div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 lg:px-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Built for serious operations.</h2>
            <p className="text-slate-500 text-lg">Not just another pretty dashboard. A structured system for growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: 'Ledger-First Finance', 
                desc: 'Every kobo is tracked with FIFO allocation and immutable audit trails.',
                icon: Wallet,
                color: 'bg-emerald-500'
              },
              { 
                title: 'Role-Aware Access', 
                desc: 'Strict permission system for Owners, Admins, Bursars and Staff.',
                icon: ShieldCheck,
                color: 'bg-brand-500'
              },
              { 
                title: 'Insightful Analytics', 
                desc: 'Real-time KPIs on revenue, arrears, and operational efficiency.',
                icon: BarChart3,
                color: 'bg-indigo-500'
              },
              { 
                title: 'Student Lifecycle', 
                desc: 'Manage enrollment, attendance, and academics in one place.',
                icon: Users,
                color: 'bg-amber-500'
              },
              { 
                title: 'Multi-Tenant Ready', 
                desc: 'Securely manage multiple campuses from a single platform.',
                icon: CheckCircle2,
                color: 'bg-blue-500'
              },
              { 
                title: 'Cloud Stability', 
                desc: 'High-availability infrastructure ensuring your data is always safe.',
                icon: Smartphone,
                color: 'bg-purple-500'
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6", feature.color)}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 lg:px-20 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="AcademixSuite Logo" className="h-12 w-auto" />
            </div>
            <p className="text-slate-500 max-w-xs leading-relaxed text-sm">
              The only financial-first school management system designed for correctness, clarity, and growth.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-brand-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-brand-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-600 transition-colors">Legal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400">© 2026 AcademixSuite. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs text-slate-400">
             <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
