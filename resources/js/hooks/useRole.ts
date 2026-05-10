import { usePage } from '@inertiajs/react';
import { PageProps } from '../types/inertia';

export function useRole() {
    const { auth } = usePage<PageProps>().props;
    const role = auth.role;

    return {
        role,
        isSuperAdmin: role === 'SUPER_ADMIN',
        isSchoolOwner: role === 'SCHOOL_OWNER',
        isSchoolAdmin: role === 'SCHOOL_ADMIN',
        isBursar: role === 'BURSAR',
        isTeacher: role === 'TEACHER',
        isStudent: role === 'STUDENT',
        isParent: role === 'PARENT',
        can: (allowedRoles: string[]) => role ? allowedRoles.includes(role) : false,
    };
}
