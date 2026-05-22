"use client";
import DataTable from "@/shared/table";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Input,
  Menu,
  Modal,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAdjustmentsHorizontal,
  IconChevronDown,
  IconEdit,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Column } from "react-table";
import { ManagerResponse, AddManagerInput, EditManagerInput } from "@/types";
import { useAddManagerForAdminMutation, useUpdateManagerForAdminMutation } from "@/lib/redux/features/admin";

const ManagersList = ({
  data,
  totalCount,
  pageSize,
  currentPage,
  setPageSize,
  setPageNumber,
  refetchManagers,
}: {
  data: ManagerResponse[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  refetchManagers: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editOpened, { open: editOpen, close: editClose }] = useDisclosure(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [createManager] = useAddManagerForAdminMutation();
  const [updateManager] = useUpdateManagerForAdminMutation();
  const [managerId, setManagerId] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");

  const handleAddManager = async () => {
    setNameError("");
    setEmailError("");
    setRoleError("");

    let valid = true;
    if (!name) {
      setNameError("Please enter a name.");
      valid = false;
    }
    if (!email) {
      setEmailError("Please enter an email.");
      valid = false;
    }
    if (!role) {
      setRoleError("Please select a role.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    const newManager: AddManagerInput = {
      name,
      email,
      role,
    };

    try {
      await createManager(newManager).unwrap();
      refetchManagers();
      setName("");
      setEmail("");
      setRole(null);
      close();
    } catch (error) {
      console.error("Failed to add manager: ", error);
    }
  };

  const resetValues = () => {
    setNameError("");
    setEmailError("");
    setRoleError("");
    close();
    editClose();
  };

  const editManagerHandler = async () => {
    setNameError("");
    setEmailError("");

    let valid = true;
    if (!name) {
      setNameError("Please enter a name.");
      valid = false;
    }
    if (!email) {
      setEmailError("Please enter an email.");
      valid = false;
    }

    if (!valid) {
      return;
    }

    const editManager: EditManagerInput = {
      id: managerId,
      name,
      email,
    };

    try {
      await updateManager(editManager);
      refetchManagers();
      setName("");
      setEmail("");
      setRole(null);
      editClose();
    } catch (error) {
      console.error("Failed to update manager: ", error);
    }
  };

  const assignId = (id: string) => {
    editOpen();
    setManagerId(id);
    return;
  };

  const columns: Array<Column<ManagerResponse>> = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => (
          <div className="text-sm font-medium text-gray-900">{value}</div>
        ),
      },
      {
        Header: "Role",
        accessor: "role",
        Cell: ({ value }) => {
          const statusClass =
            value === "Employee"
              ? "bg-gray-200 text-gray-500"
              : "bg-blue-500 text-white";
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
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Action",
        accessor: 'id',
        Cell: ({ value }) => {
          return (
            <div className="flex space-x-4">
              <ActionIcon variant="light">
                <button
                  onClick={(e) => assignId(value)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IconEdit className="w-5 h-5" />
                </button>
              </ActionIcon>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      {/* Add Manager Modal */}
      <Modal centered opened={opened} onClose={resetValues} title="Add Managers">
        <Flex className="flex-col my-5 gap-7">
          <div>
            <TextInput
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
          </div>
          <div>
            <TextInput
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
          </div>
          <div>
            <Select
              placeholder="Select Role Type"
              data={["premitigation", "postmitigation"]}
              value={role}
              onChange={(value) => setRole(value)}
            />
            {roleError && <span className="text-red-500 text-sm">{roleError}</span>}
          </div>
        </Flex>
        <Group justify="end">
          <Button onClick={handleAddManager}>Add Manager</Button>
          <Button variant="light" onClick={resetValues}>
            Cancel
          </Button>
        </Group>
      </Modal>

      {/* Edit Manager Modal */}
      <Modal centered opened={editOpened} onClose={resetValues} title="Edit Managers">
        <Flex className="flex-col my-5 gap-7">
          <div>
            <TextInput
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
          </div>
          <div>
            <TextInput
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
          </div>
        </Flex>
        <Group justify="end">
          <Button onClick={editManagerHandler}>Edit Manager</Button>
          <Button variant="light" onClick={resetValues}>
            Cancel
          </Button>
        </Group>
      </Modal>

      <Text className="text-primary-default font-bold text-2xl mb-3">
        Managers Dashboard
      </Text>
      <Flex className="gap-3 items-center">
        {/* <Input
          placeholder="Search"
          radius="md"
          w={350}
          leftSection={<IconSearch />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}

        <Button rightSection={<IconPlus />} onClick={open}>
          Add Manager
        </Button>

        {/* <Menu>
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
        </Menu> */}
        {/* <IconAdjustmentsHorizontal className="cursor-pointer" /> */}
      </Flex>
      <Box className="w-full mt-7">
        <Box>
          <Text className="text-xl px-5 py-4 bg-primary-body">
            Managers List
          </Text>
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

export default ManagersList;
