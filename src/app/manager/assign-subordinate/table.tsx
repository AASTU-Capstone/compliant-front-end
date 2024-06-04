"use client";
import DataTable from "@/shared/table";
import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  Menu,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconSearch,
  IconUserPlus,
} from "@tabler/icons-react";
import { useMemo } from "react";
import { Column } from "react-table";
import { Data } from "./page";

const AssignSubordinateTable = ({ data }: { data: Data[] }) => {
  const [opened, { open, close }] = useDisclosure(false);

  const handleAssign = (id: string) => {
    open();
  };

  const columns: Array<Column<Data>> = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ value }) => (
          <div className="text-sm font-medium text-gray-900">{value}</div>
        ),
      },
      {
        Header: "Priority",
        accessor: "priority",
        Cell: ({ value }) => {
          const statusClass =
            value === "high"
              ? "bg-red-200 text-red-800"
              : value === "medium"
                ? "bg-blue-200 text-blue-800"
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
          <Flex className="gap-2">
            <Input
              placeholder="Search"
              radius="md"
              leftSection={<IconSearch />}
            />

            <Button>Search</Button>
          </Flex>
          <Box>
            <Text className="text-2xl text-primary-default">Subordinates</Text>
            <Flex className="py-5 flex-col gap-2">
              {[1, 2, 3, 4].map((n) => {
                return (
                  <Box
                    key={n}
                    className="w-full py-2 border border-gray-200 px-3 rounded-md"
                  >
                    <Text className="font-bold">Lorem, ipsum dolor.</Text>
                    <Text c="dimmed">
                      Lorem ipsum dolor sit, amet adipisicing.
                    </Text>
                  </Box>
                );
              })}
            </Flex>
          </Box>
        </Flex>
        <Group justify="end">
          <Button>Add</Button>
          <Button variant="light" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Modal>
      <Text className="text-primary-default font-bold text-2xl mb-5">
        Complaints
      </Text>
      <Flex className="gap-3 mb-5 items-center">
        <Input
          placeholder="Search"
          radius="md"
          w={350}
          leftSection={<IconSearch />}
        />

        <Button>Search</Button>

        <Menu>
          <Menu.Target>
            <Button
              variant="transparent"
              className="text-primary-text"
              rightSection={<IconChevronDown />}
            >
              Sort by
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Items</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Menu>
          <Menu.Target>
            <Button
              variant="transparent"
              className="text-primary-text"
              rightSection={<IconChevronDown />}
            >
              Saved Search
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Items</Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <IconAdjustmentsHorizontal className="cursor-pointer" />
      </Flex>
      <Box className="w-full bg-primary-body">
        <Box className="px-2 py-5">
          <Text className="text-xl">Complaints Log</Text>
        </Box>

        <DataTable columns={columns} data={data} pageSize={5} />
      </Box>
    </>
  );
};

export default AssignSubordinateTable;
