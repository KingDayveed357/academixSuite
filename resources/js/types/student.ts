export interface Student {
  id: string
  fullName: string
  className: 'JSS1' | 'JSS2' | 'SS1'
  guardian: string
  paymentStatus: 'paid' | 'partial' | 'unpaid' | 'credit' | 'voided' | 'error'
  enrollmentStatus: 'active' | 'transferred' | 'graduated'
}

export interface EnrollmentRecord {
  session: string
  term: string
  className: string
  status: 'active' | 'completed'
  date: string
}
