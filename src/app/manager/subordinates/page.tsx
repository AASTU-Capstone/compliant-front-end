import { Box } from "@mantine/core";
import RecentComplaints from "./table";

export interface Data {
  id: string;
  name: string;
  email: string;
  mitigatedCount: string;
}

const data: Data[] = [
  {
    id: "1",
    name: "David Wagner",
    email: "Lorem Ipsum",
    mitigatedCount: "3",
  },
  {
    id: "2",
    name: "Ina Hogan",
    email: "Lorem Ipsum",
    mitigatedCount: "4",
  },
  {
    id: "3",
    name: "Devin Harmon",
    mitigatedCount: "1",
    email: "Lorem Ipsum",
  },
  {
    id: "4",
    name: "Lee Harmon",
    mitigatedCount: "6",
    email: "Lorem Ipsum",
  },
  {
    id: "5",
    name: "Lena Page",
    mitigatedCount: "8",
    email: "Lorem Ipsum",
  },
];

const page = () => {
  return (
    <>
      <Box className="w-full bg-primary-background">
        <RecentComplaints data={data} />
      </Box>
    </>
  );
};

export default page;
