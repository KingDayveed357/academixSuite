import { usePage } from '@inertiajs/react';
import { PageProps } from '../types/inertia';

export function useTenant() {
    const { tenant } = usePage<PageProps>().props;

    return {
        tenant,
        id: tenant?.id,
        name: tenant?.name,
        slug: tenant?.slug,
        onboardingCompleted: tenant?.onboarding_completed ?? false,
        metadata: tenant?.metadata,
        settings: tenant?.onboarding_settings || {},
        hasTenant: !!tenant,
    };
}
