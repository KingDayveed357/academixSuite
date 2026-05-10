import { usePage } from '@inertiajs/react';
import { PageProps } from '../types/inertia';

export function usePlan() {
    const { plan } = usePage<PageProps>().props;
    
    return {
        ...plan,
        isFree: plan?.name === 'free',
        isGrowth: plan?.name === 'growth',
        isSchool: plan?.name === 'school',
    };
}
