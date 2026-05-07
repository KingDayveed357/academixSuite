import type { KPIMetric } from '@/types/financial'

export const DASHBOARD_KPIS: Record<string, KPIMetric[]> = {
  SUPER_ADMIN: [
    { label: 'Tenant Count', value: 128, subLabel: '23 schools onboarded this year' },
    { label: 'MRR', value: 18240000, subLabel: 'Stable monthly run-rate', delta: 6 },
    { label: 'Active Schools', value: 121, subLabel: '7 paused tenants' },
    { label: 'Platform Health', value: 99, subLabel: '99.3% uptime this month' },
  ],
  SCHOOL_OWNER: [
    { label: 'Collected', value: 4820000, subLabel: '12% vs last term', delta: 12 },
    { label: 'Outstanding', value: 1340000, subLabel: '47 students pending' },
    { label: 'Staff', value: 48, subLabel: '4 invites pending' },
    { label: 'Setup', value: 82, subLabel: '2 onboarding tasks left' },
  ],
  SCHOOL_ADMIN: [
    { label: 'Students', value: 1284, subLabel: '12 active classes' },
    { label: 'Enrollments', value: 1260, subLabel: '24 transfers this term' },
    { label: 'Fee Plans', value: 18, subLabel: '3 pending approval' },
    { label: 'Reports', value: 9, subLabel: 'Generated this week' },
  ],
  BURSAR: [
    { label: 'Collected', value: 4820000, subLabel: '12% vs last term', delta: 12 },
    { label: 'Outstanding', value: 1340000, subLabel: '47 students pending' },
    { label: 'Overdue', value: 280000, subLabel: '9 students >30 days' },
    { label: 'Credit Notes', value: 95000, subLabel: '3 active notes' },
  ],
}
