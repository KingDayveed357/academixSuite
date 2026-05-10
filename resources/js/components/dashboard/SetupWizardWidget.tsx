import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import { PageProps } from '../../types/inertia';
import { Check, ArrowRight, School, Users, GraduationCap, Settings } from 'lucide-react';

interface WizardStep {
    id: string;
    title: string;
    description: string;
    href: string;
    isCompleted: boolean;
    icon: React.ElementType;
}

export default function SetupWizardWidget() {
    const { tenant } = usePage<PageProps>().props;
    
    if (!tenant) return null;

    const steps: WizardStep[] = [
        {
            id: 'onboarding',
            title: 'Complete School Profile',
            description: 'Add your logo, address and contact details.',
            href: '/onboarding',
            isCompleted: tenant.onboarding_completed,
            icon: School,
        },
        {
            id: 'staff',
            title: 'Add Staff Members',
            description: 'Invite your teachers and administrators.',
            href: '/staff',
            isCompleted: (tenant as any).staff_count > 1, // Owner is already there
            icon: Users,
        },
        {
            id: 'students',
            title: 'Register Students',
            description: 'Add your first batch of students.',
            href: '/students',
            isCompleted: (tenant as any).student_count > 0,
            icon: GraduationCap,
        },
        {
            id: 'settings',
            title: 'Configure Academics',
            description: 'Set up sessions, terms and grading.',
            href: '/settings/academics',
            isCompleted: !!tenant.onboarding_settings?.academic_session,
            icon: Settings,
        }
    ];

    const incompleteSteps = steps.filter(s => !s.isCompleted);
    if (incompleteSteps.length === 0) return null;

    const activeStepId = incompleteSteps[0].id;

    return (
        <div className="mb-8 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-theme-xs">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Setup Progress</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Complete these steps to get the most out of AcademixSuite.</p>
                </div>
                <div className="text-sm font-semibold text-brand-600 bg-brand-50 dark:bg-brand-950/30 px-3 py-1 rounded-full">
                    {steps.filter(s => s.isCompleted).length} / {steps.length} Completed
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {steps.map((step) => {
                    const isActive = step.id === activeStepId;
                    const Icon = step.icon;

                    return (
                        <Link 
                            key={step.id} 
                            href={step.href}
                            className={`relative group flex flex-col p-4 rounded-xl border transition-all duration-200 
                                ${step.isCompleted 
                                    ? 'bg-gray-50 dark:bg-gray-800/40 border-gray-100 dark:border-gray-800' 
                                    : isActive 
                                        ? 'bg-white dark:bg-gray-900 border-brand-200 dark:border-brand-800 ring-2 ring-brand-500/20' 
                                        : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700'
                                }
                                ${isActive ? 'animate-pulse-subtle' : ''}
                            `}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-lg 
                                    ${step.isCompleted ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}
                                `}>
                                    <Icon className="size-5" />
                                </div>
                                {step.isCompleted ? (
                                    <div className="bg-emerald-500 text-white rounded-full p-1">
                                        <Check className="size-3 stroke-[4]" />
                                    </div>
                                ) : isActive ? (
                                    <div className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                                    </div>
                                ) : null}
                            </div>

                            <h4 className={`text-sm font-bold mb-1 
                                ${step.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}
                            `}>
                                {step.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                {step.description}
                            </p>

                            {!step.isCompleted && (
                                <div className="mt-4 flex items-center text-[10px] font-bold text-brand-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                    Start Now <ArrowRight className="ml-1 size-3" />
                                </div>
                            )}
                        </Link>
                    );
                })}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse-subtle {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(var(--brand-500), 0.1); }
                    50% { box-shadow: 0 0 0 4px rgba(var(--brand-500), 0.1); }
                }
                .animate-pulse-subtle {
                    animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}} />
        </div>
    );
}
