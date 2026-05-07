import { useMockSession } from '../app/providers/MockSessionProvider'

export function useTenant() {
  const { tenant, session } = useMockSession()
  const school = tenant ?? { id: 0, name: 'Platform Context', slug: 'platform', domain: 'platform', location: 'Platform' }
  return { school, tenants: session.tenants }
}
