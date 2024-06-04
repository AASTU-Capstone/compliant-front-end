import { Box, Paper, SimpleGrid, Text } from "@mantine/core";
import RecentComplaints from "./table";

export interface Data {
  id: string;
  title: string;
  category: string;
  status: string;
  tags: string;
  createdDate: string;
}

const data: Data[] = [
  {
    id: "1",
    title: "David Wagner",
    status: "Resolved",
    createdDate: "24 Oct, 2015",
    tags: "LA2445",
    category: "Lorem Ipsum",
  },
  {
    id: "2",
    title: "Ina Hogan",
    status: "Inprogress",
    createdDate: "24 Oct, 2015",
    tags: "LA2445",
    category: "Lorem Ipsum",
  },
  {
    id: "3",
    title: "Devin Harmon",
    status: "Rejected",
    createdDate: "18 Dec, 2015",
    tags: "LA2445",
    category: "Lorem Ipsum",
  },
  {
    id: "4",
    title: "Lena Page",
    status: "Received",
    createdDate: "8 Oct, 2016",
    tags: "LA2445",
    category: "Lorem Ipsum",
  },
  {
    id: "5",
    title: "Eula Horton",
    status: "Inprogress",
    createdDate: "15 Jun, 2017",
    tags: "LA2445",
    category: "Lorem Ipsum",
  },
  {
    id: "6",
    title: "Victoria Perez",
    status: "Inprogress",
    createdDate: "12 Jan, 2019",
    tags: "LA2445",
    category: "Lorem Ipsum",
  },
  {
    id: "7",
    title: "Cora Medina",
    status: "Received",
    createdDate: "21 July, 2020",
    tags: "LA2445",
    category: "Lorem Ipsum",
  },
];

const Dashboard = () => {
  return (
    <Box className="pb-6 w-full bg-primary-background">
      <SimpleGrid
        className="w-full"
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 8, sm: "lg" }}
        verticalSpacing={{ base: "md", sm: "xl" }}
      >
        <Paper className="py-4 px-7">
          <Text c="dimmed">Total Complaints</Text>
          <Text className="font-bold mt-1 text-xl">645</Text>
        </Paper>
        <Paper className="py-4 px-7">
          <Text c="dimmed">Total Resolved</Text>
          <Text className="font-bold mt-1 text-xl">124</Text>
        </Paper>
        <Paper className="py-4 px-7">
          <Text c="dimmed">In-Review Complaints</Text>
          <Text className="font-bold mt-1 text-xl">545</Text>
        </Paper>
        <Paper className="py-4 px-7">
          <Text c="dimmed">Rejected Complaints</Text>
          <Text className="font-bold mt-1 text-xl">100</Text>
        </Paper>
      </SimpleGrid>

      <Box className="h-52 w-full flex justify-center items-center mt-6 bg-gray-200">
        <h1 className="text-2xl">Some Analytic Data</h1>
      </Box>
      <RecentComplaints data={data} />
    </Box>
  );
};

export default Dashboard;
