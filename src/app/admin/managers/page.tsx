import { Box } from "@mantine/core";
import ManagersList from "./table";

export interface Data {
  id: string;
  name: string;
  role: string;
  email: string;
  createdDate: string;
}

const data: Data[] = [
  {
    id: "1",
    name: "David Wagner",
    role: "Super Admin",
    createdDate: "24 Oct, 2015",
    email: "Lorem Ipsum",
  },
  {
    id: "2",
    name: "Ina Hogan",
    role: "Admin",
    createdDate: "24 Oct, 2015",
    email: "Lorem Ipsum",
  },
  {
    id: "3",
    name: "Devin Harmon",
    role: "Super Admin",
    createdDate: "18 Dec, 2015",
    email: "Lorem Ipsum",
  },
  {
    id: "4",
    name: "Lee Harmon",
    role: "Employee",
    createdDate: "18 Dec, 2015",
    email: "Lorem Ipsum",
  },
  {
    id: "5",
    name: "Lena Page",
    role: "Admin",
    createdDate: "8 Oct, 2016",
    email: "Lorem Ipsum",
  },
];

const page = () => {
  return (
    <>
      <Box className="w-full bg-primary-background">
        <ManagersList data={data} />
      </Box>
    </>
  );
};

export default page;
