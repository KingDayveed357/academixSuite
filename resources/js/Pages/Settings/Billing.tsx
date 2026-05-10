import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import PageMeta from '../../components/common/PageMeta';
import { usePage } from '@inertiajs/react';
import { PageProps } from '../../types/inertia';
import { Check, Zap, Building2, Crown } from 'lucide-react';

interface PlanCardProps {
    name: string;
    price: string;
    yearlyPrice: string;
    description: string;
    features: string[];
    isCurrent: boolean;
    isPopular?: boolean;
    icon: React.ElementType;
    onUpgrade: () => void;
}

const PlanCard = ({ name, price, yearlyPrice, description, features, isCurrent, isPopular, icon: Icon, onUpgrade }: PlanCardProps) => (
    <div className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-300 ${
        isCurrent 
            ? 'border-brand-500 bg-brand-50/30 dark:bg-brand-950/20 ring-4 ring-brand-500/10' 
            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700'
    }`}>
        {isPopular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-brand-500/20">
                Most Popular
            </div>
        )}
        
        <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-2xl ${isCurrent ? 'bg-brand-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                <Icon className="size-6" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
        </div>

        <div className="mb-8">
            <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-gray-900 dark:text-white">₦{price}</span>
                <span className="text-gray-500 dark:text-gray-400 font-medium">/month</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Or ₦{yearlyPrice}/year (Save 20%)
            </p>
        </div>

        <ul className="flex-1 space-y-4 mb-8">
            {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Check className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>

        <button
            onClick={onUpgrade}
            disabled={isCurrent}
            className={`w-full py-4 rounded-2xl font-bold transition-all duration-200 ${
                isCurrent
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 cursor-default'
                    : 'bg-brand-600 text-white hover:bg-brand-700 shadow-xl shadow-brand-500/20 hover:shadow-brand-500/30'
            }`}
        >
            {isCurrent ? 'Current Plan' : `Upgrade to ${name}`}
        </button>
    </div>
);

export default function BillingPage() {
    const { tenant, plan, support_whatsapp } = usePage<PageProps & { support_whatsapp: string }>().props;

    const handleUpgrade = (planName: string) => {
        const schoolName = encodeURIComponent(tenant?.name || 'My School');
        const msg = encodeURIComponent(
            `Hi, I'd like to upgrade ${tenant?.name} to the ${planName} plan on AcademixSuite.`
        );
        window.open(`https://wa.me/${support_whatsapp}?text=${msg}`, '_blank');
    };

    return (
        <>
            <PageMeta title="Billing & Plans - AcademixSuite" description="Manage your subscription and upgrade your school workspace." />
            
            <div className="max-w-6xl mx-auto py-8">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Choose the perfect plan</h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Scale your school administration with features designed for growth and efficiency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PlanCard
                        name="Free"
                        price="0"
                        yearlyPrice="0"
                        description="For small private tutors"
                        icon={Building2}
                        isCurrent={plan?.name === 'free'}
                        onUpgrade={() => {}}
                        features={[
                            "Up to 50 students",
                            "1 administrative staff",
                            "Core school management",
                            "Basic financial tracking",
                        ]}
                    />

                    <PlanCard
                        name="Growth"
                        price="15,000"
                        yearlyPrice="150,000"
                        description="Perfect for growing schools"
                        icon={Zap}
                        isCurrent={plan?.name === 'growth'}
                        isPopular
                        onUpgrade={() => handleUpgrade('Growth')}
                        features={[
                            "Up to 500 students",
                            "5 administrative staff",
                            "PDF/CSV Data Exports",
                            "Academic History Access",
                            "Priority Email Support",
                        ]}
                    />

                    <PlanCard
                        name="School"
                        price="45,000"
                        yearlyPrice="450,000"
                        description="For established institutions"
                        icon={Crown}
                        isCurrent={plan?.name === 'school'}
                        onUpgrade={() => handleUpgrade('School')}
                        features={[
                            "Unlimited students",
                            "Unlimited staff members",
                            "Advanced Analytics",
                            "Custom Report Cards",
                            "Dedicated Account Manager",
                        ]}
                    />
                </div>

                <div className="mt-16 p-8 bg-gray-100 dark:bg-gray-800/50 rounded-3xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Need a custom enterprise plan?</h3>
                        <p className="text-gray-500 dark:text-gray-400">For multi-campus institutions or government projects, contact our sales team.</p>
                    </div>
                    <button 
                        onClick={() => handleUpgrade('Enterprise')}
                        className="px-8 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold rounded-2xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        Contact Sales
                    </button>
                </div>
            </div>
        </>
    );
}

BillingPage.layout = (page: React.ReactNode) => <AppLayout children={page} />;
