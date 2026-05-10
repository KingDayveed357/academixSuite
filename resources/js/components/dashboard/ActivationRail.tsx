import React from 'react';
import { Link } from '@inertiajs/react';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import route from '../../utils/route';

interface Props {
  activation: {
    class_created: boolean;
    student_added: boolean;
    payment_recorded: boolean;
    all_complete: boolean;
  };
}

export default function ActivationRail({ activation }: Props) {
  if (activation.all_complete) return null;

  const steps = [
    {
      id: 'class',
      label: 'Create a class',
      href: route('classes.index'), // Assuming index as create doesn't exist
      isCompleted: activation.class_created,
    },
    {
      id: 'student',
      label: 'Add your first student',
      href: route('students.create'),
      isCompleted: activation.student_added,
    },
    {
      id: 'payment',
      label: 'Record first payment',
      href: route('finance.payments.record'),
      isCompleted: activation.payment_recorded,
    },
  ];

  const firstIncompleteIndex = steps.findIndex(s => !s.isCompleted);

  return (
    <div className="mb-8 p-6 rounded-2xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 border-l-[6px] border-l-amber-400 shadow-sm">
      <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">
        Get the most out of AcademixSuite
      </h3>

      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        {steps.map((step, index) => {
          const isActive = index === firstIncompleteIndex;
          
          return (
            <Link
              key={step.id}
              href={step.href}
              className={cn(
                "flex items-center gap-4 group transition-all",
                step.isCompleted ? "opacity-60" : "hover:translate-x-1"
              )}
            >
              <div className={cn(
                "size-6 rounded-full flex items-center justify-center border transition-all",
                step.isCompleted 
                  ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400" 
                  : "border-gray-300 dark:border-gray-700",
                isActive && !step.isCompleted && "ring-4 ring-amber-400/20 border-amber-400 animate-pulse"
              )}>
                {step.isCompleted ? <Check className="size-3.5" /> : null}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-sm font-bold tracking-tight transition-all",
                  step.isCompleted ? "text-gray-400 line-through" : "text-gray-700 dark:text-gray-300 group-hover:text-brand-600 dark:group-hover:text-brand-400"
                )}>
                  {step.label}
                </span>
                {!step.isCompleted && <ArrowRight className="size-3.5 text-gray-400 group-hover:text-brand-600" />}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
