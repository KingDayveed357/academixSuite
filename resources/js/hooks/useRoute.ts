import { usePage } from '@inertiajs/react';

export function useRoute() {
  const { ziggy } = usePage().props as any;

  if (!ziggy) {
    throw new Error(
      'useRoute() failed: Ziggy routes are not available in props. ' +
      'Make sure the HandleInertiaRequests middleware includes ziggy in shared props.'
    );
  }

  return (name: string, params?: Record<string, any> | any[], absolute?: boolean): string => {
    return window.route(name, params, absolute) || '';
  };
}

export default useRoute;
