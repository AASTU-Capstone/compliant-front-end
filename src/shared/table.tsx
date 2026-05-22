"use client";
import React, { useMemo } from "react";
import { useTable, Column } from "react-table";

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
  const pageCount = useMemo(() => Math.ceil(totalCount / pageSize), [totalCount, pageSize]);

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
    setPageNumber(1); // Reset to first page
  };

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#f1f7ff]">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-6 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="py-2 flex w-1/2 mx-auto gap-4 mt-3 items-center">
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-700">Items per page:</span>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <span>
            {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, totalCount)} of {totalCount}
          </span>
        </div>
        <div className="flex items-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-2 py-1 mx-1 border border-gray-300 rounded disabled:opacity-50"
          >
            &larr;
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pageCount}
            className="px-2 py-1 mx-1 border border-gray-300 rounded disabled:opacity-50"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
