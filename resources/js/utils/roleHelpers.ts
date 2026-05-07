import type { Role } from '../types'

export const roleHome: Record<Role, string> = {
  super_admin: '/platform',
  school_admin: '/dashboard/admin',
  teacher: '/dashboard/teacher',
  student: '/dashboard/student',
  parent: '/dashboard/parent',
}

export const roleNav: Record<Role, Array<{ label: string; href: string }>> = {
  super_admin: [
    { label: 'Platform', href: '/platform' },
    { label: 'Tenants', href: '/platform/tenants' },
    { label: 'Billing', href: '/platform/billing' },
    { label: 'Health', href: '/platform/health' },
    { label: 'Audit Logs', href: '/audit-logs' },
  ],
  school_admin: [
    { label: 'Dashboard', href: '/dashboard/admin' },
    { label: 'Students', href: '/dashboard/admin/students' },
    { label: 'Teachers', href: '/dashboard/admin/teachers' },
    { label: 'Finance', href: '/dashboard/admin/finance' },
    { label: 'Settings', href: '/dashboard/admin/settings' },
  ],
  teacher: [
    { label: 'Dashboard', href: '/dashboard/teacher' },
    { label: 'Classes', href: '/dashboard/teacher/classes' },
    { label: 'Attendance', href: '/dashboard/teacher/attendance' },
    { label: 'Results', href: '/dashboard/teacher/results' },
  ],
  student: [
    { label: 'Dashboard', href: '/dashboard/student' },
    { label: 'Courses', href: '/dashboard/student/courses' },
    { label: 'Results', href: '/dashboard/student/results' },
  ],
  parent: [
    { label: 'Dashboard', href: '/dashboard/parent' },
    { label: 'Children', href: '/dashboard/parent/children' },
    { label: 'Finance', href: '/dashboard/parent/finance' },
    { label: 'Notifications', href: '/notifications' },
  ],
}
