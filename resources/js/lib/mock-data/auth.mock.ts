import type { AuthUser } from '@/types/auth'

export const MOCK_USERS: Record<string, AuthUser> = {
  super_admin: {
    id: 1, name: 'Platform Admin', email: 'admin@academixsuite.com',
    role: 'SUPER_ADMIN',
  },
  school_owner: {
    id: 2, name: 'Mrs. Adaeze Obi', email: 'owner@greenfield.edu.ng',
    role: 'SCHOOL_OWNER',
    school: { id: 1, name: 'Greenfield Academy', subdomain: 'greenfield' },
  },
  school_admin: {
    id: 3, name: 'Mr. Emeka Nwosu', email: 'admin@greenfield.edu.ng',
    role: 'SCHOOL_ADMIN',
    school: { id: 1, name: 'Greenfield Academy', subdomain: 'greenfield' },
  },
  bursar: {
    id: 4, name: 'Chidi Okafor', email: 'bursar@greenfield.edu.ng',
    role: 'BURSAR',
    school: { id: 1, name: 'Greenfield Academy', subdomain: 'greenfield' },
  },
}
