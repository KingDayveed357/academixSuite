import { PageProps as InertiaPageProps } from '@inertiajs/core';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Membership {
    role: string;
    staff_id: string;
    status: string;
}

export interface TenantMetadata {
    address: string | null;
    contact_email: string | null;
    contact_phone: string | null;
    logo_path: string | null;
}

export interface Tenant {
    id: number;
    name: string;
    slug: string;
    domain: string | null;
    onboarding_completed: boolean;
    metadata: TenantMetadata;
    onboarding_settings: Record<string, any> | null;
}

export interface AuthProps {
    user: User | null;
    membership: Membership | null;
    role: string | null;
    permissions: {
        can_manage_staff: boolean;
        can_manage_finance: boolean;
        can_manage_students: boolean;
        can_view_analytics: boolean;
        is_owner: boolean;
    };
}

export interface PlanProps {
    name: string;
    student_limit_reached: boolean;
    student_limit_warning: boolean;
    can_export_pdf: boolean;
    can_export_csv: boolean;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T &
    InertiaPageProps & {
        app_url: string;
        is_central: boolean;
        auth: AuthProps;
        tenant: Tenant | null;
        plan: PlanProps | null;
        activation?: {
            class_created: boolean;
            student_added: boolean;
            payment_recorded: boolean;
            all_complete: boolean;
        };
        flash: {
            success: string | null;
            error: string | null;
            staff_id: string | null;
        };
    };
