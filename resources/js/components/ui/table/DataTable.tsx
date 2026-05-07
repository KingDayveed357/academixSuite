import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./index";

export interface Column<T> {
  header: React.ReactNode;
  accessor: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  title?: string;
  columns: Column<T>[];
  data: T[];
  actions?: React.ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
  searchable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
}

export function DataTable<T>({ 
  title, 
  columns, 
  data, 
  actions, 
  keyExtractor,
  searchable = true,
  pagination = true,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Client-side filtering (simple string match on the object values)
  const filteredData = React.useMemo(() => {
    if (!searchable || !searchQuery) return data;
    const lowerQuery = searchQuery.toLowerCase();
    return data.filter((item) => {
      // Basic approach: stringify the object values and search
      return Object.values(item as any).some(
        (val) => String(val).toLowerCase().includes(lowerQuery)
      );
    });
  }, [data, searchable, searchQuery]);

  // Client-side pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = React.useMemo(() => {
    if (!pagination) return filteredData;
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, pagination, currentPage, itemsPerPage]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] shadow-theme-sm">
      <div className="px-4 py-4 sm:px-6">
        {(title || actions || searchable) && (
          <div className="flex flex-col gap-4 mb-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              {title && (
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  {title}
                </h3>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {searchable && (
                <div className="relative w-full sm:w-64">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1); // Reset to page 1 on search
                    }}
                    className="w-full h-10 pl-10 pr-4 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900/50 dark:border-gray-800 dark:text-white/90 dark:focus:border-brand-800 transition-colors"
                  />
                </div>
              )}
              {actions && (
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y bg-gray-50/50 dark:bg-gray-900/20">
            <TableRow>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className={`py-3.5 px-4 font-semibold text-gray-600 text-start text-xs uppercase tracking-wider dark:text-gray-400 ${col.className ?? ''}`}
                >
                  {col.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell className="py-12 text-center text-gray-500 dark:text-gray-400" colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">No records found</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((item, rowIndex) => (
                <TableRow key={keyExtractor ? keyExtractor(item, rowIndex) : rowIndex} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} className={`py-4 px-4 text-sm text-gray-600 dark:text-gray-300 ${col.className ?? ''}`}>
                      {col.accessor(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && totalPages > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-800 sm:px-6 bg-gray-50/30 dark:bg-gray-900/10">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-medium text-gray-800 dark:text-gray-200">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium text-gray-800 dark:text-gray-200">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of{' '}
                <span className="font-medium text-gray-800 dark:text-gray-200">{filteredData.length}</span> results
              </p>
            </div>
            <div>
              <nav className="inline-flex -space-x-px rounded-md shadow-theme-xs isolate" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                      page === currentPage
                        ? "z-10 bg-brand-500 text-white focus-visible:outline-brand-600 border border-brand-500"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700 dark:bg-gray-800"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <span className="sr-only">Next</span>
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
