export type PaymentStatus = 'paid' | 'partial' | 'unpaid' | 'credit' | 'voided' | 'error'

export interface FIFOAllocation {
  feeName: string
  term: string
  amountApplied: number
  balance: number
}

export interface Payment {
  id: string
  studentName: string
  studentId: string
  amount: number
  status: PaymentStatus
  reference: string
  method: 'cash' | 'bank_transfer' | 'card'
  recordedBy: string
  recordedAt: string
  allocations: FIFOAllocation[]
}

export interface CreditNote {
  id: string
  studentName: string
  sourceReference: string
  amount: number
  reason: string
  createdAt: string
}

export interface KPIMetric {
  label: string
  value: number
  subLabel?: string
  delta?: number
}
