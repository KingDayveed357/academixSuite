import React, { useState } from 'react';
import { formatCurrency } from '../../../utils/format';
import { cn } from '../../../utils/cn';
import { Search, Wallet, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

const mockFeeItems = [
  { id: 'F-1', name: 'Term 1 Tuition', amount: 150000, balance: 150000 },
  { id: 'F-2', name: 'Development Levy', amount: 25000, balance: 25000 },
  { id: 'F-3', name: 'PTA Levy', amount: 5000, balance: 5000 },
];

export function RecordPayment() {
  const [amount, setAmount] = useState<number>(0);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Simple FIFO logic for visualization
  const calculateAllocations = (inputAmount: number) => {
    let remaining = inputAmount;
    return mockFeeItems.map(item => {
      const allocated = Math.min(remaining, item.balance);
      remaining -= allocated;
      return { ...item, allocated };
    });
  };

  const allocations = calculateAllocations(amount);
  const remainingTotal = Math.max(0, amount - mockFeeItems.reduce((acc, item) => acc + item.balance, 0));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center">
          <Wallet className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Record New Payment</h1>
          <p className="text-sm text-slate-500">Post a payment to a student's ledger.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Step 1: Student Selection */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px]">1</span>
              Select Student
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Type student name or ID..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-brand-500/20 transition-all"
                onFocus={() => setSelectedStudent({ id: 'STU-101', name: 'John Doe', class: 'SS3 Gold' })}
              />
            </div>
            
            {selectedStudent && (
              <div className="mt-4 p-4 bg-brand-50/50 border border-brand-100 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">{selectedStudent.name}</p>
                  <p className="text-xs text-slate-500">{selectedStudent.id} • {selectedStudent.class}</p>
                </div>
                <button className="text-xs font-bold text-brand-600 uppercase tracking-wider hover:underline" onClick={() => setSelectedStudent(null)}>Change</button>
              </div>
            )}
          </section>

          {/* Step 2: Amount & Method */}
          <section className={cn(
            "bg-white border border-slate-200 rounded-xl p-6 shadow-sm transition-opacity",
            !selectedStudent && "opacity-50 pointer-events-none"
          )}>
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px]">2</span>
              Payment Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Amount (₦)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₦</span>
                  <input 
                    type="number" 
                    value={amount || ''}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-8 pr-4 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-500/20"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Payment Method</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-brand-500/20">
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>POS</option>
                  <option>Cheque</option>
                </select>
              </div>
            </div>
          </section>

          {/* Step 3: FIFO Allocation Visualization (MANDATORY) */}
          <section className={cn(
            "bg-white border border-slate-200 rounded-xl p-6 shadow-sm transition-opacity",
            (!selectedStudent || amount <= 0) && "opacity-50 pointer-events-none"
          )}>
            <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-5 h-5 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px]">3</span>
              FIFO Allocation Summary
            </h3>
            
            <div className="space-y-0 relative ml-2">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
              
              {allocations.map((item, index) => (
                <div key={item.id} className="relative pl-8 pb-8 last:pb-0">
                  <div className={cn(
                    "absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-colors",
                    item.allocated > 0 ? "bg-emerald-500" : "bg-slate-200"
                  )}>
                    {item.allocated >= item.balance && item.balance > 0 ? (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">Balance: {formatCurrency(item.balance)}</p>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        "text-sm font-mono font-bold",
                        item.allocated > 0 ? "text-emerald-600" : "text-slate-400"
                      )}>
                        +{formatCurrency(item.allocated)}
                      </p>
                      {item.allocated < item.balance && item.allocated > 0 && (
                        <p className="text-[10px] text-amber-600 font-bold italic">
                          Partial — {formatCurrency(item.balance - item.allocated)} remaining
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {remainingTotal > 0 && (
                <div className="relative pl-8 pt-4 border-t border-slate-100 mt-4">
                   <div className="absolute left-0 top-5.5 w-6 h-6 rounded-full border-4 border-white shadow-sm bg-blue-500 flex items-center justify-center">
                      <Plus className="w-3 h-3 text-white" />
                   </div>
                   <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Wallet Credit (Overpayment)</p>
                      <p className="text-[10px] text-slate-500 font-medium">Will be applied to future bills</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono font-bold text-blue-600">
                        +{formatCurrency(remainingTotal)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-xl p-6 shadow-xl sticky top-24">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Payment Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                <span className="text-xs text-slate-400">Total Received</span>
                <span className="text-xl font-bold">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Student</span>
                <span className="font-bold text-slate-200">{selectedStudent?.name || '---'}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Reference</span>
                <span className="font-mono text-slate-300 uppercase tracking-tighter">AUTO-GENERATE</span>
              </div>
            </div>

            <button 
              disabled={!selectedStudent || amount <= 0}
              className={cn(
                "w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all",
                (!selectedStudent || amount <= 0) 
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed" 
                  : "bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/20"
              )}
            >
              Post Payment
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <p className="text-[10px] text-center text-slate-500 mt-4 font-medium italic">
              Payments are immutable once posted.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
             <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
             <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
               Correctness check: Ensure the payment method and amount match the bank statement or cash in hand.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
