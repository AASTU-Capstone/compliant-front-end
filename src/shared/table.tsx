import React, { useMemo, useState } from "react";
import { useTable } from "react-table";

type DataTableProps<T> = {
  columns: any;
  data: any;
  pageSize: number;
};

function DataTable<T>({ columns, data, pageSize: size }: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(size);

  const pageCount = Math.ceil(data.length / pageSize);
  const currentPageData = useMemo(() => {
    const startIndex = currentPage * pageSize;
    return data.slice(startIndex, startIndex + pageSize);
  }, [currentPage, pageSize, data]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: currentPageData });

  const handlePreviousPage = () => {
    setCurrentPage((old) => Math.max(0, old - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((old) => Math.min(pageCount - 1, old + 1));
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(0); // Reset to first page
  };

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="min-w-full divide-y divide-gray-200"
      >
        <thead className="bg-[#f1f7ff]">
          {headerGroups.map((headerGroup) => (
            // eslint-disable-next-line react/jsx-key
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line react/jsx-key
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
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line react/jsx-key
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  // eslint-disable-next-line react/jsx-key
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
            {currentPage * pageSize + 1}-
            {Math.min((currentPage + 1) * pageSize, data.length)} of{" "}
            {data.length}
          </span>
        </div>
        <div className="flex items-center">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="px-2 py-1 mx-1 border border-gray-300 rounded disabled:opacity-50"
          >
            &larr;
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pageCount - 1}
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
