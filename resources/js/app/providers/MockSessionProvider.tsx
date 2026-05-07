import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Role } from '../../types/roles';
import {
  MOCK_SESSION_KEY,
  defaultSession,
  defaultTenantForUser,
  mockTenants,
  mockUsers,
  type MockSession,
  type MockTenant,
  type MockUser,
} from '../../mock-data/session';

type SignInPayload = {
  staffId: string;
  password: string;
};

type MockSessionContextValue = {
  session: MockSession;
  user: MockUser | null;
  tenant: MockTenant | null;
  role: Role | null;
  signIn: (payload: SignInPayload) => { ok: boolean; message?: string; user?: MockUser; tenant?: MockTenant | null; tenants?: MockTenant[] };
  signOut: () => void;
  switchTenant: (tenantId: number) => void;
  completeOnboarding: () => void;
  registerSchool: (payload: { schoolName: string; location: string; ownerName: string; email: string; password: string; slug: string; contactEmail?: string; contactPhone?: string; address?: string; city?: string; state?: string; country?: string; roleTitle?: string; }) => void;
};

const MockSessionContext = createContext<MockSessionContextValue | undefined>(undefined);

function readSession(): MockSession {
  if (typeof window === 'undefined') {
    return defaultSession();
  }

  try {
    const raw = window.localStorage.getItem(MOCK_SESSION_KEY);
    if (!raw) return defaultSession();
    const parsed = JSON.parse(raw) as MockSession;
    const fallbackTenant = parsed.user ? defaultTenantForUser(parsed.user) : null;
    const fallbackTenants = parsed.user
      ? parsed.user.role === 'SUPER_ADMIN'
        ? mockTenants
        : mockTenants.filter((candidate) => parsed.user?.tenantIds.includes(candidate.id))
      : defaultSession().tenants;

    return {
      ...defaultSession(),
      ...parsed,
      user: parsed.user ?? null,
      tenant: parsed.tenant ?? fallbackTenant,
      tenants: parsed.tenants?.length ? parsed.tenants : fallbackTenants,
    };
  } catch {
    return defaultSession();
  }
}

function persist(session: MockSession): void {
  window.localStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(session));
}

export function MockSessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<MockSession>(() => readSession());

  useEffect(() => {
    persist(session);
    document.documentElement.classList.toggle('dark', true);
  }, [session]);

  const value = useMemo<MockSessionContextValue>(() => {
    const signIn = ({ staffId, password }: SignInPayload) => {
      const user = mockUsers.find((candidate) => candidate.staffId.toLowerCase() === staffId.toLowerCase().trim());

      if (!user || user.password !== password.trim()) {
        return { ok: false, message: 'Invalid Staff ID or password.' };
      }

      const tenant = defaultTenantForUser(user);
      const tenants = user.role === 'SUPER_ADMIN' ? mockTenants : mockTenants.filter((candidate) => user.tenantIds.includes(candidate.id));

      setSession({
        user,
        tenant,
        tenants,
        onboardingCompleted: user.role === 'SUPER_ADMIN' ? true : false,
      });

      return { ok: true, user, tenant, tenants };
    };

    const signOut = () => {
      setSession(defaultSession());
    };

    const switchTenant = (tenantId: number) => {
      setSession((current) => {
        if (!current.user) return current;
        const tenant = mockTenants.find((candidate) => candidate.id === tenantId) ?? current.tenant;
        const tenants = current.user.role === 'SUPER_ADMIN' ? mockTenants : mockTenants.filter((candidate) => current.user?.tenantIds.includes(candidate.id));

        return { ...current, tenant, tenants };
      });
    };

    const completeOnboarding = () => {
      setSession((current) => ({ ...current, onboardingCompleted: true }));
    };

    const registerSchool = (payload: { 
      schoolName: string; 
      location: string; 
      ownerName: string; 
      email: string; 
      password: string; 
      slug: string;
      contactEmail?: string;
      contactPhone?: string;
      address?: string;
      city?: string;
      state?: string;
      country?: string;
      roleTitle?: string;
    }) => {
      const { schoolName, location, ownerName, email, password, slug } = payload;
      const nextId = mockTenants.length + 1;
      const tenant: MockTenant = {
        id: nextId,
        name: schoolName,
        slug,
        domain: `${slug}.academixsuite.test`,
        location,
      };

      const user: MockUser = {
        id: 100 + nextId,
        name: ownerName,
        email,
        staffId: `SO-${String(nextId).padStart(3, '0')}`,
        password,
        role: 'SCHOOL_OWNER',
        tenantIds: [tenant.id],
      };

      mockTenants.push(tenant);
      mockUsers.push(user);

      setSession({
        user,
        tenant,
        tenants: [tenant],
        onboardingCompleted: false,
      });
    };

    return {
      session,
      user: session.user,
      tenant: session.tenant,
      role: session.user?.role ?? null,
      signIn,
      signOut,
      switchTenant,
      completeOnboarding,
      registerSchool,
    };
  }, [session]);

  return <MockSessionContext.Provider value={value}>{children}</MockSessionContext.Provider>;
}

export function useMockSession() {
  const context = useContext(MockSessionContext);
  if (!context) {
    throw new Error('useMockSession must be used within MockSessionProvider');
  }
  return context;
}