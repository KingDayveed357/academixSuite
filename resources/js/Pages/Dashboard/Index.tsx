import PageMeta from "../../components/common/PageMeta";
import AppLayout from "../../layouts/AppLayout";
import { useMockSession } from "../../app/providers/MockSessionProvider";
import StatCard from "../../components/dashboard/StatCard";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import { GroupIcon, BoxIconLine } from "../../icons"; 
import { Building2, Users, Wallet, GraduationCap, DollarSign, Activity } from "lucide-react";

export default function DashboardIndex() {
  const { user, role, tenant } = useMockSession();

  const renderSuperAdminDashboard = () => (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4 mb-6">
        <StatCard title="Total Schools" value="12" icon={<Building2 className="text-gray-800 dark:text-white/90 size-6" />} trend={{ value: "12%", isUp: true }} />
        <StatCard title="Active Users" value="1,245" icon={<Users className="text-gray-800 dark:text-white/90 size-6" />} trend={{ value: "4%", isUp: true }} />
        <StatCard title="Total MRR" value="$12,500" icon={<DollarSign className="text-gray-800 dark:text-white/90 size-6" />} trend={{ value: "8%", isUp: true }} />
        <StatCard title="System Health" value="99.9%" icon={<Activity className="text-gray-800 dark:text-white/90 size-6" />} />
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-8 space-y-6">
          <MonthlySalesChart />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <DemographicCard />
        </div>
      </div>
    </>
  );

  const renderOwnerDashboard = () => (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4 mb-6">
        <StatCard title="Total Students" value="840" icon={<GraduationCap className="text-gray-800 dark:text-white/90 size-6" />} trend={{ value: "5%", isUp: true }} />
        <StatCard title="Staff Members" value="45" icon={<Users className="text-gray-800 dark:text-white/90 size-6" />} />
        <StatCard title="Term Revenue" value="$42,500" icon={<Wallet className="text-gray-800 dark:text-white/90 size-6" />} trend={{ value: "2%", isUp: true }} />
        <StatCard title="Pending Dues" value="$4,200" icon={<DollarSign className="text-gray-800 dark:text-white/90 size-6" />} trend={{ value: "1%", isUp: false }} />
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-7 space-y-6">
          <MonthlySalesChart />
        </div>
        <div className="col-span-12 xl:col-span-5">
           <RecentOrders />
        </div>
      </div>
    </>
  );

  const renderAdminDashboard = () => (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-3 mb-6">
        <StatCard title="Total Students" value="840" icon={<GraduationCap className="text-gray-800 dark:text-white/90 size-6" />} />
        <StatCard title="Active Classes" value="24" icon={<Building2 className="text-gray-800 dark:text-white/90 size-6" />} />
        <StatCard title="Teachers" value="32" icon={<Users className="text-gray-800 dark:text-white/90 size-6" />} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <RecentOrders />
      </div>
    </>
  );

  const renderBursarDashboard = () => (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4 mb-6">
        <StatCard title="Today's Collection" value="$1,250" icon={<Wallet className="text-gray-800 dark:text-white/90 size-6" />} trend={{ value: "8%", isUp: true }} />
        <StatCard title="Pending Invoices" value="45" icon={<DollarSign className="text-gray-800 dark:text-white/90 size-6" />} />
        <StatCard title="Total Expenses" value="$800" icon={<Activity className="text-gray-800 dark:text-white/90 size-6" />} />
        <StatCard title="Cash on Hand" value="$4,500" icon={<Wallet className="text-gray-800 dark:text-white/90 size-6" />} />
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 xl:col-span-8">
          <MonthlySalesChart />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <RecentOrders />
        </div>
      </div>
    </>
  );

  return (
    <>
      <PageMeta
        title={`Dashboard - ${tenant?.name ?? 'AcademixSuite'}`}
        description="Dashboard Overview"
      />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Welcome back, {user?.name.split(' ')[0] ?? 'User'} 👋
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here's what's happening at {tenant?.name ?? 'your school'} today.
          </p>
        </div>
      </div>

      {role === 'SUPER_ADMIN' && renderSuperAdminDashboard()}
      {role === 'SCHOOL_OWNER' && renderOwnerDashboard()}
      {role === 'SCHOOL_ADMIN' && renderAdminDashboard()}
      {role === 'BURSAR' && renderBursarDashboard()}
    </>
  );
}

DashboardIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;
