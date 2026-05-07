import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import AppLayout from "../../../layouts/AppLayout";
import { DataTable, type Column } from "../../../components/ui/table/DataTable";
import Badge from "../../../components/ui/badge/Badge";
import StatCard from "../../../components/dashboard/StatCard";
import { Wallet, Activity, DollarSign } from "lucide-react";

interface FeeType {
  id: string;
  name: string;
  amount: number;
  frequency: string;
  applicableTo: string;
  status: "Active" | "Draft" | "Archived";
}

const mockFees: FeeType[] = [
  { id: "FEE-001", name: "Term Tuition (Junior)", amount: 45000, frequency: "Per Term", applicableTo: "JSS 1 - JSS 3", status: "Active" },
  { id: "FEE-002", name: "Term Tuition (Senior)", amount: 55000, frequency: "Per Term", applicableTo: "SS 1 - SS 3", status: "Active" },
  { id: "FEE-003", name: "School Bus Service", amount: 15000, frequency: "Per Term", applicableTo: "Opt-in", status: "Active" },
  { id: "FEE-004", name: "Uniform Levy", amount: 25000, frequency: "One-off", applicableTo: "New Students", status: "Draft" },
  { id: "FEE-005", name: "PTA Development Levy", amount: 5000, frequency: "Per Session", applicableTo: "All Students", status: "Active" },
];

export default function FeesIndex() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  const columns: Column<FeeType>[] = [
    {
      header: "Fee Name",
      accessor: (f) => <span className="font-semibold text-gray-800 dark:text-white/90">{f.name}</span>,
    },
    {
      header: "Amount",
      accessor: (f) => <span className="font-medium text-gray-800 dark:text-white/90">{formatCurrency(f.amount)}</span>,
    },
    {
      header: "Frequency",
      accessor: (f) => f.frequency,
    },
    {
      header: "Applicable To",
      accessor: (f) => f.applicableTo,
    },
    {
      header: "Status",
      accessor: (f) => (
        <Badge
          size="sm"
          color={f.status === "Active" ? "success" : f.status === "Draft" ? "warning" : "error"}
        >
          {f.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: () => (
        <button className="text-brand-500 hover:text-brand-600 font-medium text-sm transition-colors">
          Edit
        </button>
      ),
    }
  ];

  const tableActions = (
    <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors">
      Create Fee Structure
    </button>
  );

  return (
    <>
      <PageMeta title="Fee Structures" description="Build and manage fee categories for collection." />
      
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Fee Structures
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Define tuition, levies, and optional services for billing generation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
        <StatCard title="Active Fee Categories" value="4" icon={<Activity className="text-gray-800 dark:text-white/90 size-6" />} />
        <StatCard title="Avg Junior Term Fee" value="₦45,000" icon={<Wallet className="text-gray-800 dark:text-white/90 size-6" />} />
        <StatCard title="Avg Senior Term Fee" value="₦55,000" icon={<DollarSign className="text-gray-800 dark:text-white/90 size-6" />} />
      </div>

      <DataTable 
        title="Fee Builder"
        columns={columns}
        data={mockFees}
        actions={tableActions}
        keyExtractor={(item) => item.id}
        searchable={true}
        pagination={true}
      />
    </>
  );
}

FeesIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;