// Use a simple redirect to construct routes without relying on Ziggy
// This is a fallback that constructs common route patterns

export function route(name: string, params?: Record<string, any> | any[], absolute?: boolean): string {
  // Try to use the global Ziggy route function if available
  if (typeof window !== 'undefined' && typeof (window as any).route === 'function') {
    try {
      return (window as any).route(name, params, absolute);
    } catch (e) {
      // Fall through to fallback
    }
  }
  
  // Simple fallback: handle common route names by pattern
  const paramObj = Array.isArray(params) ? {} : (params || {});
  
  const routes: Record<string, string> = {
    'onboarding.wizard': '/onboarding',
    'students.create': '/students/new',
    'students.store': '/students',
    'classes.index': '/classes',
    'finance.payments.record': '/finance/payments/record',
    'tenant.login': '/login',
    'login': '/login',
  };
  
  const baseUrl = routes[name];
  if (!baseUrl) {
    console.warn(`route('${name}') not found in route map. Using fallback.`);
    return '/';
  }
  
  return baseUrl;
}

export default route;



