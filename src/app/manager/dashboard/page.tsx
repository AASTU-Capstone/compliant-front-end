import { Box } from "@mantine/core";

export interface Data {
  id: string;
  title: string;
  category: string;
  status: string;
  tags: string;
  createdDate: string;
}

const Dashboard = () => {
  return (
    <Box className="pb-6 w-full bg-primary-background">
      <Box className="h-screen w-full flex justify-center items-center bg-gray-200">
        <h1 className="text-2xl">Some Analytic Data</h1>
      </Box>
    </Box>
  );
};

export default Dashboard;
