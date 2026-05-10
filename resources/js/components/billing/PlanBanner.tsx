import React, { useState, useEffect } from 'react';
import { usePlan } from '../../hooks/usePlan';
import { usePage, Link } from '@inertiajs/react';
import { X, ArrowRight } from 'lucide-react';

export default function PlanBanner() {
    const plan = usePlan();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (plan.isFree) {
            const dismissedAt = localStorage.getItem('plan_banner_dismissed_at');
            if (!dismissedAt) {
                setIsVisible(true);
            } else {
                const dismissDate = new Date(parseInt(dismissedAt));
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                
                if (dismissDate < sevenDaysAgo) {
                    setIsVisible(true);
                }
            }
        }
    }, [plan.isFree]);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('plan_banner_dismissed_at', Date.now().toString());
    };

    if (!isVisible) return null;

    return (
        <div className="sticky top-0 z-40 h-10 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-100 dark:border-amber-900/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-2 text-sm font-medium text-amber-800 dark:text-amber-200">
                <span className="bg-amber-100 dark:bg-amber-900 px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider">Free Plan</span>
                <p>
                    Limited to 50 students · Upgrade for unlimited exports and staff members.
                </p>
                <Link 
                    href="/settings/billing" 
                    className="flex items-center gap-1 ml-2 text-amber-900 dark:text-amber-100 underline decoration-amber-300 dark:decoration-amber-700 hover:decoration-amber-500"
                >
                    Upgrade anytime <ArrowRight className="size-3" />
                </Link>
            </div>
            
            <button 
                onClick={handleDismiss}
                className="p-1 hover:bg-amber-100 dark:hover:bg-amber-900/50 rounded-md transition-colors text-amber-600 dark:text-amber-400"
            >
                <X className="size-4" />
            </button>
        </div>
    );
}
