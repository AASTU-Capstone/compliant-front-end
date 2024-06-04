"use client";
import DataTable from "@/shared/table";
import ViewComplaint from "@/shared/view-complaint";
import { Box, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconEye, IconSquareCheck, IconSquareX } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { Data } from "./page";

const Complaints = ({ data }: { data: Data[] }) => {
  const [isViewModalOpened, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [isEditModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [complaint, setComplaint] = useState();
  const [rejecting, isRejecting] = useState(false);

  const handleAccept = (id: string) => {
    modals.openConfirmModal({
      title: "Accept Complaint",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to Accept this complaint</Text>
      ),
      labels: { confirm: "Accept Complaint", cancel: "Cancel" },
      confirmProps: { color: "green" },
      closeOnConfirm: true,
      onConfirm: async () => {
        // delete from the db
        console.log(`Delete item with id: ${id}`);
        return;
      },
    });
  };

  const handleReject = (id: string) => {
    modals.openConfirmModal({
      title: "Reject Complaint",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to Reject this complaint</Text>
      ),
      labels: { confirm: "Reject Complaint", cancel: "Cancel" },
      confirmProps: { color: "red" },
      closeOnConfirm: true,
      onConfirm: async () => {
        // delete from the db
        console.log(`Delete item with id: ${id}`);
        return;
      },
    });
  };

  const handleView = (id: string) => {
    // fetch the complaint using the id
    // set to setComplaint after fetching the complaint
    // the open the modal by calling open()
    openViewModal();
  };

  const columns: Array<Column<Data>> = useMemo(
    () => [
      {
        Header: "Complaints Title",
        accessor: "title",
        Cell: ({ value }) => (
          <div className="text-sm font-medium text-gray-900">{value}</div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => {
          const statusClass =
            value === "Resolved"
              ? "bg-green-200 text-green-800"
              : value === "Inprogress"
                ? "bg-blue-200 text-blue-800"
                : value === "Rejected"
                  ? "bg-red-200 text-red-800"
                  : "bg-gray-200 text-gray-800";
          return (
            <span
              className={`py-1 px-5 text-center text-xs leading-5 font-semibold rounded-full ${statusClass}`}
            >
              {value}
            </span>
          );
        },
      },
      {
        Header: "Created Date",
        accessor: "createdDate",
      },
      {
        Header: "Issuer",
        accessor: "issuer",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex space-x-4">
            <button
              onClick={() => handleView(row.original.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconEye className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleAccept(row.original.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconSquareCheck color="green" className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleReject(row.original.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconSquareX color="red" className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Modal
        size="70%"
        centered
        opened={isViewModalOpened}
        onClose={closeViewModal}
        title="Complaint"
      >
        <ViewComplaint complaint={complaint} />
      </Modal>
      <Box className="w-full bg-primary-body">
        <Box className="px-2 py-5">
          <Text className="text-xl">Complaints</Text>
        </Box>

        <DataTable columns={columns} data={data} pageSize={10} />
      </Box>
    </>
  );
};

export default Complaints;
