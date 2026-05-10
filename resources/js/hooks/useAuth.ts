import { usePage, router } from '@inertiajs/react';
import { PageProps } from '../types/inertia';

export function useAuth() {
    const { auth } = usePage<PageProps>().props;

    const signOut = () => {
        router.post('/logout');
    };

    return {
        user: auth.user,
        membership: auth.membership,
        role: auth.role,
        permissions: auth.permissions,
        isAuthenticated: !!auth.user,
        signOut,
    };
}
