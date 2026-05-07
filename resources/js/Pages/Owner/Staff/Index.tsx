import React from "react";
import { Link } from "@inertiajs/react";
import { UserPlus } from "lucide-react";
import PageMeta from "../../../components/common/PageMeta";
import AppLayout from "../../../layouts/AppLayout";
import { DataTable, type Column } from "../../../components/ui/table/DataTable";
import Badge from "../../../components/ui/badge/Badge";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited" | "Inactive";
  lastActive: string;
}

const mockStaff: StaffMember[] = [
  { id: "STF-001", name: "David Ouma", email: "david.ouma@school.edu", role: "School Admin", status: "Active", lastActive: "Today at 9:30 AM" },
  { id: "STF-002", name: "Sarah Jenkins", email: "sarah.j@school.edu", role: "Bursar", status: "Active", lastActive: "Yesterday" },
  { id: "STF-003", name: "Michael Chang", email: "m.chang@school.edu", role: "Teacher", status: "Invited", lastActive: "Never" },
  { id: "STF-004", name: "Linda Okoro", email: "linda.o@school.edu", role: "Teacher", status: "Active", lastActive: "Today at 1:15 PM" },
  { id: "STF-005", name: "James Wilson", email: "j.wilson@school.edu", role: "School Admin", status: "Inactive", lastActive: "2 weeks ago" },
];

export default function StaffIndex() {
  const columns: Column<StaffMember>[] = [
    {
      header: "Staff Member",
      accessor: (s) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 font-semibold">
            {s.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-white/90">{s.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: (s) => <span className="font-medium text-gray-600 dark:text-gray-300">{s.role}</span>,
    },
    {
      header: "Status",
      accessor: (s) => (
        <Badge
          size="sm"
          color={s.status === "Active" ? "success" : s.status === "Inactive" ? "error" : "warning"}
        >
          {s.status}
        </Badge>
      ),
    },
    {
      header: "Last Active",
      accessor: (s) => s.lastActive,
    },
    {
      header: "Actions",
      accessor: () => (
        <button className="text-brand-500 hover:text-brand-600 font-medium text-sm transition-colors">
          Manage Access
        </button>
      ),
    }
  ];

  const tableActions = (
    <>
      <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
        Export
      </button>
      <Link href="/staff/invite" className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors">
        <UserPlus className="h-4 w-4" />
        Invite Staff
      </Link>
    </>
  );

  return (
    <>
      <PageMeta title="Staff Management" description="Manage school staff members and access control." />
      
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Staff Directory
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View, invite, and manage system access for all school personnel.
          </p>
        </div>
      </div>

      <DataTable 
        title="All Staff Members"
        columns={columns}
        data={mockStaff}
        actions={tableActions}
        keyExtractor={(item) => item.id}
        searchable={true}
        pagination={true}
        itemsPerPage={10}
      />
    </>
  );
}

StaffIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;