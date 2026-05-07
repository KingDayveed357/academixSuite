import { Role, User } from '../types/roles';
import { useMockSession } from '../app/providers/MockSessionProvider';

export function useAuth() {
  const { user, role, signIn, signOut, session, registerSchool, switchTenant, completeOnboarding } = useMockSession();
  const resolvedUser = user ? { id: String(user.id), name: user.name, email: user.email, role: user.role } : null;

  const hasRole = (roles: Role | Role[]) => {
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    return resolvedUser ? rolesArray.includes(resolvedUser.role) : false;
  };

  return {
    user: resolvedUser,
    role,
    hasRole,
    isAuthenticated: !!user,
    signIn,
    signOut,
    session,
    registerSchool,
    switchTenant,
    completeOnboarding,
  };
}
