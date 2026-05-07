import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import AppLayout from "../../../layouts/AppLayout";
import { DataTable, type Column } from "../../../components/ui/table/DataTable";

interface ClassItem {
  id: string;
  name: string;
  students: number;
  capacity: number;
  teacher: string;
  room: string;
}

const mockClasses: ClassItem[] = [
  { id: "CLS-001", name: "JSS 1 Alpha", students: 35, capacity: 40, teacher: "Mr. Adams", room: "Block A - Room 1" },
  { id: "CLS-002", name: "JSS 1 Beta", students: 38, capacity: 40, teacher: "Mrs. Smith", room: "Block A - Room 2" },
  { id: "CLS-003", name: "JSS 2 Alpha", students: 40, capacity: 40, teacher: "Mr. Johnson", room: "Block B - Room 1" },
  { id: "CLS-004", name: "SS 1 Science", students: 28, capacity: 35, teacher: "Dr. Okafor", room: "Science Lab 1" },
  { id: "CLS-005", name: "SS 1 Arts", students: 30, capacity: 35, teacher: "Ms. Davis", room: "Block C - Room 3" },
];

export default function ClassesIndex() {
  const columns: Column<ClassItem>[] = [
    {
      header: "Class Name",
      accessor: (c) => <span className="font-semibold text-gray-800 dark:text-white/90">{c.name}</span>,
    },
    {
      header: "Students",
      accessor: (c) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-800 dark:text-white/90 font-medium">{c.students}</span>
          <span className="text-xs text-gray-500">/ {c.capacity}</span>
          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden dark:bg-gray-800 ml-2">
            <div 
              className={`h-full rounded-full ${c.students >= c.capacity ? 'bg-error-500' : 'bg-brand-500'}`} 
              style={{ width: `${(c.students / c.capacity) * 100}%` }}
            ></div>
          </div>
        </div>
      ),
    },
    {
      header: "Form Teacher",
      accessor: (c) => c.teacher,
    },
    {
      header: "Room",
      accessor: (c) => c.room,
    },
    {
      header: "Actions",
      accessor: () => (
        <button className="text-brand-500 hover:text-brand-600 font-medium text-sm transition-colors">
          View Roster
        </button>
      ),
    }
  ];

  const tableActions = (
    <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition-colors">
      Create Class
    </button>
  );

  return (
    <>
      <PageMeta title="Classes Management" description="Manage school classes, rosters, and room assignments." />
      
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            Classes
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage class capacity, rosters, and form teachers.
          </p>
        </div>
      </div>

      <DataTable 
        title="Active Classes"
        columns={columns}
        data={mockClasses}
        actions={tableActions}
        keyExtractor={(item) => item.id}
        searchable={true}
        pagination={true}
      />
    </>
  );
}

ClassesIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;