import type { Role } from '../types/roles';

export interface MockTenant {
  id: number;
  name: string;
  slug: string;
  domain: string;
  location: string;
}

export interface MockUser {
  id: number;
  name: string;
  email: string;
  staffId: string;
  password: string;
  role: Role;
  tenantIds: number[];
}

export interface MockSession {
  user: MockUser | null;
  tenant: MockTenant | null;
  tenants: MockTenant[];
  onboardingCompleted: boolean;
}

export const mockTenants: MockTenant[] = [
  {
    id: 1,
    name: 'Greenfield Academy',
    slug: 'greenfield',
    domain: 'greenfield.academixsuite.test',
    location: 'Lagos, Nigeria',
  },
  {
    id: 2,
    name: 'Academix Primary',
    slug: 'academix-primary',
    domain: 'academix-primary.academixsuite.test',
    location: 'Abuja, Nigeria',
  },
  {
    id: 3,
    name: 'Academix Secondary',
    slug: 'academix-secondary',
    domain: 'academix-secondary.academixsuite.test',
    location: 'Port Harcourt, Nigeria',
  },
];

export const mockUsers: MockUser[] = [
  {
    id: 1,
    name: 'Platform Admin',
    email: 'admin@academixsuite.com',
    staffId: 'SA-001',
    password: 'password',
    role: 'SUPER_ADMIN',
    tenantIds: [],
  },
  {
    id: 2,
    name: 'Dr. Sarah Benson',
    email: 'owner@greenfield.edu.ng',
    staffId: 'SO-001',
    password: 'password',
    role: 'SCHOOL_OWNER',
    tenantIds: [1, 2],
  },
  {
    id: 3,
    name: 'Mr. James Okafor',
    email: 'admin@greenfield.edu.ng',
    staffId: 'AD-001',
    password: 'password',
    role: 'SCHOOL_ADMIN',
    tenantIds: [1],
  },
  {
    id: 4,
    name: 'Mrs. Funke Akindele',
    email: 'bursar@greenfield.edu.ng',
    staffId: 'BU-001',
    password: 'password',
    role: 'BURSAR',
    tenantIds: [1],
  },
];

export const MOCK_SESSION_KEY = 'academixsuite.mock.session';

export function defaultTenantForUser(user: MockUser | null): MockTenant | null {
  if (!user?.tenantIds.length) return null;
  return mockTenants.find((tenant) => tenant.id === user.tenantIds[0]) ?? null;
}

export function defaultSession(): MockSession {
  const user = mockUsers.find((candidate) => candidate.staffId === 'SO-001') ?? null;
  return {
    user,
    tenant: defaultTenantForUser(user),
    tenants: user ? mockTenants.filter((tenant) => user.tenantIds.includes(tenant.id)) : mockTenants,
    onboardingCompleted: false,
  };
}