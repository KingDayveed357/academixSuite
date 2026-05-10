import { Head, Link, usePage, router } from '@inertiajs/react';
import { Building2, ArrowRight, School, Plus, LogOut } from 'lucide-react';
import { cn } from '../../../utils/cn';
import GridShape from '../../../components/common/GridShape';

interface Tenant {
  id: number;
  name: string;
  slug: string;
  domain?: string | null;
  location?: string | null;
  role?: 'SCHOOL_OWNER' | 'SCHOOL_ADMIN' | 'BURSAR' | string;
}

export default function TenantSelection() {
  const { schools } = usePage<{ schools: Tenant[] }>().props;

  const selectSchool = (schoolId: number) => {
    router.post('/select-tenant', { school_id: schoolId });
  };

  const signOut = () => {
    router.post('/logout');
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 p-6 dark:bg-gray-900">
      <Head title="Select School - AcademixSuite" />
      
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-20">
        <GridShape />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                <School className="text-white size-6" />
             </div>
             <span className="text-2xl font-extrabold text-slate-900 dark:text-white">Academix<span className="text-brand-600">Suite</span></span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Select your school</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-2">You are associated with multiple institutions.</p>
        </div>

        {/* Tenant List */}
        <div className="grid gap-4">
          {schools.length > 0 ? schools.map((tenant) => (
            <button 
              key={tenant.id}
              type="button"
              onClick={() => selectSchool(tenant.id)}
              className={cn('group flex items-center justify-between rounded-[2rem] border bg-white p-6 text-left shadow-sm transition-all duration-300 dark:bg-gray-800', 'border-gray-200 dark:border-gray-700 hover:border-brand-500 dark:hover:border-brand-500')}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-brand-50 dark:group-hover:bg-brand-500/10 group-hover:text-brand-600 transition-colors">
                  <Building2 className="size-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors">{tenant.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
                      tenant.role === 'SCHOOL_OWNER' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" :
                      tenant.role === 'SCHOOL_ADMIN' ? "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400" :
                      "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                    )}>
                      {(tenant.role ?? 'school').replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400">{tenant.location ?? tenant.domain ?? `${tenant.slug}.academixsuite.test`}</span>
                  </div>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-300 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all">
                <ArrowRight className="size-5" />
              </div>
            </button>
          )) : (
            <div className="rounded-[2rem] border border-dashed border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
              <p className="text-sm font-bold text-slate-900 dark:text-white">No schools found</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This account is not yet linked to any tenant.</p>
            </div>
          )}

          {/* Create New School Option */}
          <Link 
            href="/register"
            className="mt-4 p-6 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-brand-500/50 hover:bg-brand-50/30 dark:hover:bg-brand-500/5 transition-all text-center group"
          >
            <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-gray-400 font-bold group-hover:text-brand-600">
               <Plus className="size-5" />
               Register another school
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
            <button onClick={signOut} className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
              Sign out and use a different account
           </button>
        </div>
      </div>
    </div>
  );
}
