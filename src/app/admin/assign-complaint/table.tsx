"use client";
import DataTable from "@/shared/table";
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
import { useDisclosure } from "@mantine/hooks";
import { IconUserPlus } from "@tabler/icons-react";
import { useMemo } from "react";
import { Column } from "react-table";
import { Data } from "./page";

const AssignComplaintTable = ({ data }: { data: Data[] }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleAssign = (id: string) => {
    open();
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

  return (
    <>
      <Modal centered opened={opened} onClose={close} title="Assign Manager">
        <Flex className="flex-col my-5 gap-7">
          <TextInput placeholder="title" />
          <Select placeholder="Priority" data={["High", "Medium", "Low"]} />
          <Select
            placeholder="Select Manager"
            data={["manager 1", "manager 2", "manager 3"]}
          />
        </Flex>
        <Group justify="end">
          <Button>Add</Button>
          <Button variant="light" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Box className="w-full bg-primary-body">
        <Box className="px-2 py-5">
          <Text className="text-xl">My Complaints</Text>
        </Box>

        <DataTable columns={columns} data={data} pageSize={10} />
      </Box>
    </>
  );
};

export default AssignComplaintTable;
