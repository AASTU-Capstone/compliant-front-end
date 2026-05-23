"use client";
import React, { useMemo } from "react";
import { useTable, Column } from "react-table";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type DataTableProps<T extends object> = {
  columns: Column<T>[];
  data: T[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

function DataTable<T extends object>({
  columns,
  data,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  setPageNumber,
}: DataTableProps<T>) {
  const pageCount = useMemo(
    () => Math.ceil(totalCount / pageSize),
    [totalCount, pageSize]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handlePreviousPage = () => {
    setPageNumber((old) => Math.max(1, old - 1));
  };

  const handleNextPage = () => {
    setPageNumber((old) => Math.min(pageCount, old + 1));
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setPageNumber(1);
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-border"
        >
          <thead className="bg-muted/50">
            {headerGroups.map((headerGroup) => {
              const { key, ...headerGroupProps } =
                headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...headerGroupProps}>
                  {headerGroup.headers.map((column) => {
                    const { key: colKey, ...columnProps } =
                      column.getHeaderProps();
                    return (
                      <th
                        key={colKey}
                        {...columnProps}
                        className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="bg-card divide-y divide-border"
          >
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-muted-foreground"
                >
                  No data available
                </td>
              </tr>
            ) : (
              rows.map((row) => {
                prepareRow(row);
                const { key, ...rowProps } = row.getRowProps();
                return (
                  <tr
                    key={key}
                    {...rowProps}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    {row.cells.map((cell) => {
                      const { key: cellKey, ...cellProps } =
                        cell.getCellProps();
                      return (
                        <td
                          key={cellKey}
                          {...cellProps}
                          className="px-6 py-4 whitespace-nowrap text-sm text-foreground"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-3 py-1.5 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {totalCount === 0
              ? "0 items"
              : `${(currentPage - 1) * pageSize + 1}-${Math.min(
                  currentPage * pageSize,
                  totalCount
                )} of ${totalCount}`}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <IconChevronLeft size={16} />
            </button>
            <span className="px-3 py-1 text-sm font-medium text-foreground">
              {currentPage}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === pageCount || pageCount === 0}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <IconChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
