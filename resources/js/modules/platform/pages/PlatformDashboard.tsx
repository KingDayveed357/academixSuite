import React from 'react';
import { 
  Building2, 
  Users, 
  Activity, 
  CreditCard, 
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  Globe
} from 'lucide-react';
import { formatCurrency } from '../../../utils/format';
import { cn } from '../../../utils/cn';

export function PlatformDashboard() {
  const stats = [
    { label: 'Total Tenants', value: '1,284', icon: Building2, trend: '+12%', color: 'bg-brand-500' },
    { label: 'Active Users', value: '42.5k', icon: Users, trend: '+8%', color: 'bg-indigo-500' },
    { label: 'Monthly Revenue', value: formatCurrency(12500000), icon: CreditCard, trend: '+15%', color: 'bg-emerald-500' },
    { label: 'System Health', value: '99.98%', icon: Activity, trend: 'Stable', color: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Platform Overview</h1>
          <p className="text-sm text-slate-500">Global system health and tenant performance.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[10px] font-bold uppercase tracking-widest animate-pulse">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
          All Systems Operational
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center text-white", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1",
                stat.trend.startsWith('+') ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
              )}>
                {stat.trend}
                {stat.trend.startsWith('+') && <TrendingUp className="w-2.5 h-2.5" />}
              </span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tenants */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-500" />
                Recent Institutions
              </h3>
              <button className="text-[10px] font-bold text-brand-600 uppercase tracking-wider hover:underline">Manage All</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                       <th className="px-6 py-4">Institution</th>
                       <th className="px-6 py-4">Plan</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Growth</th>
                       <th className="px-6 py-4"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'St. Kizito Academy', location: 'Lagos, NG', plan: 'Enterprise', status: 'ACTIVE', growth: '+22%' },
                      { name: 'Royal Oak International', location: 'Abuja, NG', plan: 'Basic', status: 'ACTIVE', growth: '+5%' },
                      { name: 'Grace Hill College', location: 'Port Harcourt, NG', plan: 'Pro', status: 'PENDING', growth: '---' },
                    ].map((tenant, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                         <td className="px-6 py-4">
                            <div>
                               <p className="text-sm font-bold text-slate-900">{tenant.name}</p>
                               <p className="text-[10px] text-slate-500 font-medium">{tenant.location}</p>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase">{tenant.plan}</span>
                         </td>
                         <td className="px-6 py-4">
                            <span className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                              tenant.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                            )}>
                               {tenant.status}
                            </span>
                         </td>
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
                               {tenant.growth}
                               {tenant.growth !== '---' && <ArrowUpRight className="w-3 h-3 text-emerald-500" />}
                            </div>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <button className="text-slate-400 hover:text-brand-600 transition-colors">
                               <ArrowUpRight className="w-4 h-4" />
                            </button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Security Logs */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl rounded-full"></div>
           <h3 className="text-sm font-bold flex items-center gap-2 mb-6 relative z-10">
              <ShieldAlert className="w-4 h-4 text-brand-400" />
              Platform Audit Logs
           </h3>
           <div className="space-y-6 relative z-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-4">
                   <div className="w-1 h-8 rounded-full bg-slate-800 shrink-0"></div>
                   <div>
                      <p className="text-xs font-bold text-slate-100">
                         {i === 1 ? 'New tenant registration: Grace Hill' : 
                          i === 2 ? 'Global API latency spike detected' : 
                          i === 3 ? 'Security patch v2.4.1 deployed' : 
                          'Successful database migration'}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">04:22 PM • US-EAST-1</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-8 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all">
              View All Platform Events
           </button>
        </div>
      </div>
    </div>
  );
}

