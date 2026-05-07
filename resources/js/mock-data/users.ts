import { User } from '../types/roles';

export const mockUsers: Record<string, User> = {
  super_admin: {
    id: '1',
    name: 'Platform Admin',
    email: 'admin@academixsuite.com',
    role: 'SUPER_ADMIN',
  },
  school_owner: {
    id: '2',
    name: 'Dr. Sarah Benson',
    email: 'owner@stkizito.edu',
    role: 'SCHOOL_OWNER',
    schoolId: 'sk-001',
  },
  school_admin: {
    id: '3',
    name: 'Mr. James Okafor',
    email: 'admin@stkizito.edu',
    role: 'SCHOOL_ADMIN',
    schoolId: 'sk-001',
  },
  bursar: {
    id: '4',
    name: 'Mrs. Funke Akindele',
    email: 'bursar@stkizito.edu',
    role: 'BURSAR',
    schoolId: 'sk-001',
  },
};
