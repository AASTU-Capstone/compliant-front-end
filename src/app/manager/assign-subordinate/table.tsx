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
import { useMemo, useState } from "react";
import { Column } from "react-table";
import {
  GetComplaintLogToAssignForManagerResponse,
  GetSubordinatesResponse,
  AssignSubordinateInput,
} from "@/types";
import {
  useGetSubordinatesQuery,
  useAssignSubordinateMutation,
} from "@/lib/redux/features/manager";

const AssignSubordinateTable = ({
  data,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  setPageNumber,
  refetchComplaintLog,
}: {
  data: GetComplaintLogToAssignForManagerResponse[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  refetchComplaintLog: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: subordinates, refetch } = useGetSubordinatesQuery({pageNumber:1, pageSize:10});
  const [assignSubordinate] = useAssignSubordinateMutation();
  const [selectedSubordinate, setSelectedSubordinate] = useState<string | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    return data.filter((item: GetComplaintLogToAssignForManagerResponse) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data]);

  const handleAssign = (id: string) => {
    setSelectedComplaint(id);
    refetch();
    open();
  };

  const handleSubordinateClick = (id: string) => {
    setSelectedSubordinate(id);
  };

  const handleAddClick = async () => {
    if (selectedSubordinate && selectedComplaint) {
      const assignedSubordinate: AssignSubordinateInput = {
        complaintLogId: selectedComplaint,
        subordinateId: selectedSubordinate,
      };

      try {
        await assignSubordinate(assignedSubordinate).unwrap();
        refetch();
        setSelectedComplaint(null);
        setSelectedSubordinate(null);
        close();
        refetchComplaintLog();
      } catch (error) {
        console.error("Failed to assign subordinate: ", error);
      }
    }
  };

  const columns: Array<Column<GetComplaintLogToAssignForManagerResponse>> =
    useMemo(
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
          accessor: "createdAt",
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
      <Modal centered opened={opened} onClose={close} title="Assign Subordinate">
        <Flex className="flex-col my-5 gap-7">
          <Flex className="gap-2">
            <Input
              placeholder="Search"
              radius="md"
              leftSection={<IconSearch />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button>Search</Button>
          </Flex>
          <Box>
            <Text className="text-2xl text-primary-default">Subordinates</Text>
            <Flex className="py-5 flex-col gap-2">
              {subordinates?.data?.map(
                (subordinate: GetSubordinatesResponse) => (
                  <Box
                    key={subordinate.id}
                    onClick={() => handleSubordinateClick(subordinate.id)}
                    className={`w-full py-2 border border-gray-200 px-3 rounded-md ${selectedSubordinate === subordinate.id ? "bg-gray-200" : ""
                      }`}
                  >
                    <Text className="font-bold">{subordinate.name}</Text>
                    <Text c="dimmed">{subordinate.email}</Text>
                  </Box>
                )
              )}
            </Flex>
          </Box>
        </Flex>
        <Group justify="end">
          <Button onClick={handleAddClick} disabled={!selectedSubordinate}>
            Assign
          </Button>
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
          <Text className="text-xl">My Complaints Log</Text>
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

export default AssignSubordinateTable;
