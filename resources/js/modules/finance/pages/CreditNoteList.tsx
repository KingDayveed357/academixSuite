import React from 'react';
import { formatCurrency, formatDate } from '../../../utils/format';
import { cn } from '../../../utils/cn';
import { Plus, Search, Info } from 'lucide-react';

const mockCreditNotes = [
  { id: 'CN-001', student: 'Jane Smith', amount: 5000, reason: 'Sibling Discount', date: '2026-04-15', status: 'ACTIVE' },
  { id: 'CN-002', student: 'Mark Wilson', amount: 12000, reason: 'Overpayment Correction', date: '2026-04-10', status: 'USED' },
  { id: 'CN-003', student: 'Sarah Adams', amount: 2500, reason: 'Scholarship Grant', date: '2026-04-05', status: 'VOIDED' },
];

export function CreditNoteList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Credit Notes</h1>
          <p className="text-sm text-slate-500">Manage student credits and discounts.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all shadow-sm shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          Issue Credit Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCreditNotes.map((note) => (
          <div 
            key={note.id} 
            className={cn(
              "bg-white border-y border-r border-slate-200 rounded-r-xl p-5 shadow-sm transition-all hover:shadow-md border-l-4",
              note.status === 'VOIDED' ? "border-l-slate-300 opacity-60" : "border-l-blue-500"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 uppercase">
                  {note.id}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-2">{note.student}</h3>
              </div>
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                note.status === 'ACTIVE' ? "bg-blue-50 text-blue-700" : 
                note.status === 'USED' ? "bg-slate-100 text-slate-600" : "bg-red-50 text-red-600"
              )}>
                {note.status}
              </span>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Amount</p>
                <p className="text-lg font-bold text-slate-900">{formatCurrency(note.amount)}</p>
              </div>
              <div className="text-right text-xs text-slate-500">
                Issued {formatDate(note.date)}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-slate-600">
              <Info className="w-3 h-3 text-slate-400" />
              <p className="text-[11px] font-medium italic">{note.reason}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-4 items-start">
        <div className="w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-blue-900">About Credit Notes</h4>
          <p className="text-xs text-blue-700 leading-relaxed mt-1">
            Credit notes represent money owed to students or discounts applied. 
            They are <span className="font-bold underline">never</span> styled like payments and appear with a distinct blue accent.
            Active credit notes can be applied during the next payment recording flow.
          </p>
        </div>
      </div>
    </div>
  );
}
