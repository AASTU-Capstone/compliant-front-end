"use client";
import DataTable from "@/shared/table";
import ViewComplaint from "@/shared/view-complaint";
import { Box, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import EditComplaint from "../_components/edit-complaint";
import { Data } from "./page";

const MyComplaints = ({ data }: { data: Data[] }) => {
  const [isViewModalOpened, { open: openViewModal, close: closeViewModal }] =
    useDisclosure(false);
  const [isEditModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [complaint, setComplaint] = useState();
  const [deleting, isDeleting] = useState(false);

  const handleEdit = (id: string) => {
    console.log(`Edit item with id: ${id}`);
    // fetch complaint using the id
    // set to setComplaint after fetching the complaint
    openEditModal();
  };

  const handleDelete = (id: string) => {
    modals.openConfirmModal({
      title: "Delete Complaint",
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this complaint</Text>
      ),
      labels: { confirm: "Delete Complaint", cancel: "Cancel" },
      confirmProps: { color: "red", loading: deleting },
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
              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}
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
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex space-x-4">
            <button
              onClick={() => handleEdit(row.original.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconEdit className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleView(row.original.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconEye className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(row.original.id)}
              className="text-gray-500 hover:text-gray-700"
            >
              <IconTrash className="w-5 h-5" />
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

      <Modal
        size="70%"
        centered
        opened={isEditModalOpened}
        onClose={closeEditModal}
        title="Edit Complaint"
      >
        <EditComplaint closeModal={closeEditModal} complaint={complaint} />
      </Modal>
      <Box className="w-full mt-7">
        <Box>
          <Text className="text-xl px-5 py-4 bg-primary-body">
            My Complaints
          </Text>
        </Box>

        <DataTable columns={columns} data={data} pageSize={5} />
      </Box>
    </>
  );
};

export default MyComplaints;
