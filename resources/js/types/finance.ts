export type Currency = 'NGN';

export interface Money {
  amount: number;
  currency: Currency;
  formatted: string;
}

export type PaymentStatus = 'SUCCESSFUL' | 'VOIDED' | 'PARTIAL' | 'PENDING';

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  date: string;
  method: 'CASH' | 'TRANSFER' | 'POS' | 'CHEQUE';
  status: PaymentStatus;
  reference: string;
  recordedBy: string;
  allocations: Allocation[];
  voidedReason?: string;
}

export interface Allocation {
  id: string;
  feeItemId: string;
  feeItemName: string;
  amount: number;
  term: string;
}

export interface CreditNote {
  id: string;
  studentId: string;
  amount: number;
  reason: string;
  date: string;
  status: 'ACTIVE' | 'USED' | 'VOIDED';
}

export interface StudentFinancialSummary {
  totalBilled: number;
  totalPaid: number;
  balanceDue: number;
  creditBalance: number;
}
