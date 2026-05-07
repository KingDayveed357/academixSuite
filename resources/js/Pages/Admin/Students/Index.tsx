import { Link } from "@inertiajs/react";
import PageMeta from "../../../components/common/PageMeta";
import AppLayout from "../../../layouts/AppLayout";
import { DataTable, type Column } from "../../../components/ui/table/DataTable";
import Badge from "../../../components/ui/badge/Badge";

interface Student {
  id: string;
  name: string;
  grade: string;
  status: "Active" | "Inactive" | "Suspended";
  enrollmentDate: string;
}

const mockStudents: Student[] = [
  { id: "STU-001", name: "Alice Johnson", grade: "Grade 10", status: "Active", enrollmentDate: "2023-09-01" },
  { id: "STU-002", name: "Bob Smith", grade: "Grade 11", status: "Active", enrollmentDate: "2022-09-01" },
  { id: "STU-003", name: "Charlie Davis", grade: "Grade 9", status: "Inactive", enrollmentDate: "2024-01-15" },
  { id: "STU-004", name: "Diana Prince", grade: "Grade 12", status: "Suspended", enrollmentDate: "2021-09-01" },
  { id: "STU-005", name: "Evan Wright", grade: "Grade 10", status: "Active", enrollmentDate: "2023-09-01" },
];

export default function StudentsIndex() {
  const columns: Column<Student>[] = [
    {
      header: "ID",
      accessor: (s) => <span className="font-medium text-gray-800 dark:text-white/90">{s.id}</span>,
    },
    {
      header: "Name",
      accessor: (s) => <span className="font-medium text-gray-800 dark:text-white/90">{s.name}</span>,
    },
    {
      header: "Grade",
      accessor: (s) => s.grade,
    },
    {
      header: "Enrollment Date",
      accessor: (s) => s.enrollmentDate,
    },
    {
      header: "Status",
      accessor: (s) => (
        <Badge
          size="sm"
          color={s.status === "Active" ? "success" : s.status === "Suspended" ? "error" : "warning"}
        >
          {s.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: () => (
        <button className="text-brand-500 hover:text-brand-600 font-medium text-sm">
          View
        </button>
      ),
    }
  ];

  const tableActions = (
    <>
      <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
        Filter
      </button>
      <Link href="/students/new" className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-theme-sm font-medium text-white shadow-theme-xs hover:bg-brand-600">
        Add Student
      </Link>
    </>
  );

  return (
    <>
      <PageMeta title="Students Management" description="Manage all students enrolled in the institution." />
      
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
          Students
        </h2>
      </div>

      <DataTable 
        title="All Students"
        columns={columns}
        data={mockStudents}
        actions={tableActions}
        keyExtractor={(item) => item.id}
      />
    </>
  );
}

StudentsIndex.layout = (page: React.ReactNode) => <AppLayout children={page} />;
