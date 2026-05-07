import { usePage } from '@inertiajs/react'
import type { AuthUser, UserRole } from '@/types/auth'

export function useRole() {
  const page = usePage<{ auth?: { user?: AuthUser } }>()
  const inertiaUser = page.props.auth?.user

  const storedRole = (typeof window !== 'undefined'
    ? localStorage.getItem('mock_role')
    : null) as UserRole | null

  const role: UserRole = inertiaUser?.role ?? storedRole ?? 'SCHOOL_ADMIN'

  return {
    role,
    isSuperAdmin: role === 'SUPER_ADMIN',
    isSchoolOwner: role === 'SCHOOL_OWNER',
    isSchoolAdmin: role === 'SCHOOL_ADMIN',
    isBursar: role === 'BURSAR',
    can: (allowedRoles: UserRole[]) => allowedRoles.includes(role),
  }
}
