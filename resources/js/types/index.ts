export type Role = 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'parent'

export interface AuthUser {
  id: number
  name: string
  email: string
  role: Role
}

export interface NavItem {
  label: string
  href: string
}

export interface StatCard {
  label: string
  value: string
  subLabel: string
}
