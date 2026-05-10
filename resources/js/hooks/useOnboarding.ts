import { useForm, router } from '@inertiajs/react';
import { useTenant } from './useTenant';
import { useAuth } from './useAuth';
import { useState, useEffect } from 'react';

export function useOnboarding() {
    const { tenant, settings: savedSettings } = useTenant();
    const { user } = useAuth();
    
    // Persist current step to the backend
    const [currentStep, setCurrentStepState] = useState(Number(savedSettings?.wizard_step) || 1);
    
    const setCurrentStep = (n: number) => {
        setCurrentStepState(n);
        // Persist silently to backend
        router.post('/onboarding/settings', { wizard_step: String(n) }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const form = useForm({
        // Step 1: Your School
        address: tenant?.metadata?.address || '',
        contact_email: tenant?.metadata?.contact_email || user?.email || '',
        contact_phone: tenant?.metadata?.contact_phone || '',
        
        // Step 2: Your Setup
        academic_session: savedSettings?.academic_session || '2024/2025',
        currency: savedSettings?.currency || 'NGN',
        fee_template: savedSettings?.fee_template || 'standard',
        wizard_step: String(currentStep),
    });

    const saveStep = (stepData: Partial<typeof form.data>, onVisibleSuccess?: () => void) => {
        form.setData({ ...form.data, ...stepData });
        
        form.post('/onboarding/settings', {
            preserveScroll: true,
            onSuccess: () => {
                if (onVisibleSuccess) onVisibleSuccess();
            },
        });
    };

    const complete = () => {
        router.post('/onboarding/complete');
    };

    return {
        form,
        currentStep,
        setCurrentStep,
        saveStep,
        complete,
        tenant,
    };
}
