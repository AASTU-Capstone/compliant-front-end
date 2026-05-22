"use client";
import React, { useMemo, useState } from "react";
import DataTable from "@/shared/table";
import { IconUserPlus } from "@tabler/icons-react";
import {
  useGetManagersForAdminQuery,
  useAssignManagerForAdminMutation,
} from "@/lib/redux/features/admin";
import { Column } from "react-table";
import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { Data } from "./page";
import { useDisclosure } from "@mantine/hooks";

const AssignComplaintTable = ({
  data,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  setPageNumber,
  refetchComplaints,
}: {
  data: Data[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  refetchComplaints: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedManager, setSelectedManager] = useState<string | null>(null);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(
    null
  );
  const [title, setTitle] = useState<string>("");
  const [priority, setPriority] = useState<string | null>(null);

  const [assignManager, { isLoading: isAssigning }] =
    useAssignManagerForAdminMutation();

  const handleAssign = (complaintId: string) => {
    setSelectedComplaintId(complaintId);
    open();
  };

  const handleSubmit = async () => {
    if (selectedManager && selectedComplaintId && title && priority) {
      const assignData = {
        title,
        priority,
        managerId: selectedManager,
        complaintId: selectedComplaintId,
      };
      await assignManager(assignData);
      close();
      refetchComplaints();
    }
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
        accessor: "createdAt",
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
              onClick={() => handleAssign(row.original.id)}
              className="text-gray-500 ml-4 hover:text-gray-700"
            >
              <IconUserPlus className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { data: res, isLoading, isSuccess } = useGetManagersForAdminQuery({});
  const type1 = res?.data?.type1 || [];
  const type2 = res?.data?.type2 || [];
  const managers = [type1, type2];

  return (
    <>
      <Modal centered opened={opened} onClose={close} title="Assign Manager">
        <Flex className="flex-col my-5 gap-7">
          <TextInput
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
          />
          <Select
            placeholder="Priority"
            data={["high", "medium", "low"]}
            value={priority}
            onChange={(value) => setPriority(value)}
          />
          <Select
            placeholder="Select Manager"
            data={managers?.map((manager) => ({
              value: manager.id,
              label: manager.name,
            }))}
            value={selectedManager}
            onChange={(value) => setSelectedManager(value)}
          />
        </Flex>
        <Group justify="end">
          <Button onClick={handleSubmit} loading={isAssigning}>
            Add
          </Button>
          <Button variant="light" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Box className="w-full bg-primary-body">
        <Box className="px-2 py-5">
          <Text className="text-xl">My Complaints</Text>
        </Box>

        <DataTable
          columns={columns}
          data={data}
          totalCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          setPageSize={setPageSize}
          setPageNumber={setPageNumber}
        />
      </Box>
    </>
  );
};

export default AssignComplaintTable;
