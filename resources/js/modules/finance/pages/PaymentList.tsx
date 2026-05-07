import React from 'react';
import { Payment } from '../../../types/finance';
import { formatCurrency, formatDate } from '../../../utils/format';
import { cn } from '../../../utils/cn';
import { Search, Filter, Download, Plus, MoreVertical, ShieldAlert } from 'lucide-react';

const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    studentId: 'STU-101',
    amount: 150000.00,
    date: '2026-05-01',
    method: 'TRANSFER',
    status: 'SUCCESSFUL',
    reference: 'TRX-998271',
    recordedBy: 'Mrs. Funke Akindele',
    allocations: [
      { id: 'AL-1', feeItemId: 'FEE-1', feeItemName: 'Tuition', amount: 100000, term: 'Term 1' },
      { id: 'AL-2', feeItemId: 'FEE-2', feeItemName: 'Development Levy', amount: 50000, term: 'Term 1' },
    ],
  },
  {
    id: 'PAY-002',
    studentId: 'STU-102',
    amount: 75000.00,
    date: '2026-05-02',
    method: 'CASH',
    status: 'VOIDED',
    reference: 'CSH-0012',
    recordedBy: 'Mrs. Funke Akindele',
    allocations: [],
    voidedReason: 'Wrong student selected',
  },
  {
    id: 'PAY-003',
    studentId: 'STU-103',
    amount: 50000.00,
    date: '2026-05-03',
    method: 'POS',
    status: 'PARTIAL',
    reference: 'POS-8821',
    recordedBy: 'Mrs. Funke Akindele',
    allocations: [
      { id: 'AL-3', feeItemId: 'FEE-1', feeItemName: 'Tuition', amount: 50000, term: 'Term 1' },
    ],
  },
];

export function PaymentList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payment Ledger</h1>
          <p className="text-sm text-slate-500">View and audit all financial transactions.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm shadow-brand-500/20">
          <Plus className="w-4 h-4" />
          Record Payment
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reference or student..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Date</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Reference</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Student</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 text-right">Amount</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">Method</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockPayments.map((payment) => (
                <tr key={payment.id} className={cn(
                  "hover:bg-slate-50/50 transition-colors group",
                  payment.status === 'VOIDED' && "bg-slate-50/30"
                )}>
                  <td className="px-6 py-4 text-sm text-slate-600">{formatDate(payment.date)}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                      {payment.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Student Name</p>
                      <p className="text-[10px] text-slate-500 uppercase font-medium">{payment.studentId}</p>
                    </div>
                  </td>
                  <td className={cn(
                    "px-6 py-4 text-sm font-bold text-right",
                    payment.status === 'VOIDED' ? "text-slate-400 line-through" : "text-slate-900"
                  )}>
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-500 border border-slate-200 px-2 py-0.5 rounded uppercase tracking-wider">
                      {payment.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <StatusBadge status={payment.status} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Showing 3 of 152 payments</p>
          <div className="flex items-center gap-1">
             <button className="px-3 py-1 text-xs font-bold border border-slate-200 rounded bg-white text-slate-400 cursor-not-allowed">Previous</button>
             <button className="px-3 py-1 text-xs font-bold border border-brand-200 rounded bg-brand-50 text-brand-600">1</button>
             <button className="px-3 py-1 text-xs font-bold border border-slate-200 rounded bg-white text-slate-600 hover:bg-slate-50 transition-colors">2</button>
             <button className="px-3 py-1 text-xs font-bold border border-slate-200 rounded bg-white text-slate-600 hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
      
      {/* Activity Log - Rule 7 */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-brand-500" />
            Audit Trail
          </h3>
          <button className="text-[10px] font-bold text-brand-600 uppercase tracking-wider">View All</button>
        </div>
        <div className="p-4 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3 relative pb-4 last:pb-0">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-slate-200 z-10"></div>
              {i === 1 && <div className="absolute left-[3px] top-4 bottom-0 w-[2px] bg-slate-100"></div>}
              <div>
                <p className="text-xs text-slate-600">
                  <span className="font-bold text-slate-900">Mrs. Funke Akindele</span> voided payment <span className="font-mono font-bold bg-slate-100 px-1 rounded text-slate-900">PAY-002</span>
                </p>
                <p className="text-[10px] text-slate-400 mt-1">2 hours ago • St. Kizito Admin</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'SUCCESSFUL':
      return <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100 uppercase tracking-wider">SUCCESSFUL</span>;
    case 'VOIDED':
      return <span className="text-[10px] font-bold bg-red-50 text-red-700 px-2 py-0.5 rounded-full border border-red-100 uppercase tracking-wider italic">VOIDED</span>;
    case 'PARTIAL':
      return <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-100 uppercase tracking-wider italic">PARTIAL</span>;
    default:
      return <span className="text-[10px] font-bold bg-slate-50 text-slate-700 px-2 py-0.5 rounded-full border border-slate-100 uppercase tracking-wider">{status}</span>;
  }
}
