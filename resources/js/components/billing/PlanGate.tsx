import React, { ReactNode } from 'react';
import { usePlan } from '../../hooks/usePlan';
import { Lock } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface PlanGateProps {
    feature: 'can_export_pdf' | 'can_export_csv';
    children: ReactNode;
}

export default function PlanGate({ feature, children }: PlanGateProps) {
    const plan = usePlan();
    const hasAccess = plan[feature];

    if (hasAccess) {
        return <>{children}</>;
    }

    return (
        <div className="relative group">
            <div className="opacity-40 grayscale pointer-events-none">
                {children}
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-2 shadow-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-default">
                    <Lock className="size-3.5 text-amber-600" />
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Available on Growth. <Link href="/settings/billing" className="text-brand-600 hover:underline">Upgrade anytime →</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
