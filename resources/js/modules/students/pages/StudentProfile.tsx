import React from 'react';
import { formatCurrency } from '../../../utils/format';
import { cn } from '../../../utils/cn';
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen, 
  Wallet, 
  History,
  TrendingUp,
  CreditCard,
  AlertCircle
} from 'lucide-react';

export function StudentProfile() {
  const summary = {
    totalBilled: 450000.00,
    totalPaid: 320000.00,
    balanceDue: 130000.00,
    creditBalance: 0.00
  };

  return (
    <div className="space-y-8">
      {/* Notion-style Header */}
      <div className="relative">
        <div className="h-48 w-full bg-slate-100 rounded-2xl overflow-hidden relative group">
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
           <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 shadow-sm border border-slate-200">Change Cover</button>
           </div>
        </div>
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-xl">
            <div className="w-full h-full rounded-2xl bg-brand-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-white">
              JS
            </div>
          </div>
          <div className="pb-4">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">John Samuel Doe</h1>
            <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
              <span className="bg-brand-50 text-brand-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Active</span>
              SS3 Gold • STU/2026/001
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Financials */}
        <div className="lg:col-span-2 space-y-8">
          {/* Rule 5: Financial Summary (STRICT ORDER) */}
          <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
             <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-brand-500" />
                  Financial Summary
                </h3>
                <button className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">Statement</button>
             </div>
             <div className="grid grid-cols-3 divide-x divide-slate-100">
                <div className="p-6">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Billed</p>
                   <p className="text-xl font-bold text-slate-900">{formatCurrency(summary.totalBilled)}</p>
                </div>
                <div className="p-6">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Paid</p>
                   <p className="text-xl font-bold text-emerald-600">{formatCurrency(summary.totalPaid)}</p>
                </div>
                <div className="p-6 bg-slate-50/30">
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Balance Due</p>
                   <p className={cn(
                     "text-xl font-bold",
                     summary.balanceDue > 0 ? "text-red-600" : "text-slate-900"
                   )}>
                     {formatCurrency(summary.balanceDue)}
                   </p>
                </div>
             </div>
          </section>

          {/* Details Tabs */}
          <div className="space-y-6">
             <div className="flex border-b border-slate-200 gap-8">
                {['Overview', 'Attendance', 'Academics', 'Documents'].map((tab, i) => (
                  <button key={tab} className={cn(
                    "pb-3 text-sm font-bold transition-all relative",
                    i === 0 ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                  )}>
                    {tab}
                    {i === 0 && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full"></div>}
                  </button>
                ))}
             </div>

             <div className="grid grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                   <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Personal Info</h4>
                   <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                         <Calendar className="w-4 h-4 text-slate-400" />
                         <span className="text-slate-600 font-medium">12 Jan 2008 (18 years)</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                         <User className="w-4 h-4 text-slate-400" />
                         <span className="text-slate-600 font-medium">Male</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                         <MapPin className="w-4 h-4 text-slate-400" />
                         <span className="text-slate-600 font-medium">12 Garden Ave, Lagos</span>
                      </div>
                   </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                   <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Guardian Info</h4>
                   <div className="space-y-3">
                      <p className="text-sm font-bold text-slate-900">Mr. Robert Samuel Doe</p>
                      <div className="flex items-center gap-3 text-sm">
                         <Phone className="w-4 h-4 text-slate-400" />
                         <span className="text-slate-600 font-medium">+234 801 234 5678</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                         <Mail className="w-4 h-4 text-slate-400" />
                         <span className="text-slate-600 font-medium">robert.doe@example.com</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Timeline & Quick Actions */}
        <div className="space-y-6">
           <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                 <button className="w-full text-left px-4 py-2 rounded-lg bg-brand-50 text-brand-700 text-xs font-bold hover:bg-brand-100 transition-colors flex items-center justify-between group">
                    Record Payment
                    <CreditCard className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="w-full text-left px-4 py-2 rounded-lg bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-between group">
                    Generate Report
                    <BookOpen className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                 </button>
                 <button className="w-full text-left px-4 py-2 rounded-lg bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition-colors flex items-center justify-between group">
                    Void Enrollment
                    <AlertCircle className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                 </button>
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm overflow-hidden">
              <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center justify-between">
                Activity Feed
                <History className="w-4 h-4 text-slate-400" />
              </h3>
              <div className="space-y-6 relative">
                 <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-slate-100"></div>
                 {[1, 2, 3].map((i) => (
                    <div key={i} className="relative pl-6">
                       <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-slate-200 border-2 border-white"></div>
                       <p className="text-xs text-slate-600 leading-tight">
                          {i === 1 ? 'Tuition payment recorded for Term 1' : 
                           i === 2 ? 'Enrolled in SS3 Gold' : 
                           'Account created by Mr. Admin'}
                       </p>
                       <p className="text-[10px] text-slate-400 mt-1">2 days ago</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
