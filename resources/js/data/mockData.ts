import type { AuthUser, Role, StatCard } from '../types'

export const defaultUser: AuthUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@academixsuite.com',
  role: 'school_admin',
}

export const roleOptions: Role[] = ['super_admin', 'school_admin', 'teacher', 'student', 'parent']

export const adminStats: StatCard[] = [
  { label: 'Students', value: '1,284', subLabel: '42 added this term' },
  { label: 'Collections', value: 'NGN 12,440,000.00', subLabel: '92% target achieved' },
  { label: 'Outstanding', value: 'NGN 1,880,000.00', subLabel: '137 families pending' },
  { label: 'Reconciliation', value: '3 mismatches', subLabel: 'Needs review today' },
]

export const payments = [
  { id: 'PAY-1022', student: 'Adaeze Okonkwo', amount: 'NGN 20,000.00', status: 'paid', date: '2026-05-04' },
  { id: 'PAY-1021', student: 'Tobi Ajayi', amount: 'NGN 5,000.00', status: 'partial', date: '2026-05-04' },
  { id: 'PAY-1017', student: 'Mary Nweke', amount: 'NGN 15,000.00', status: 'voided', date: '2026-05-03' },
]
