import { Box, Button, Flex, Textarea } from "@mantine/core";

const page = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <Box className="bg-white min-h-screen p-7 rounded-lg">
      <Flex className="mb-4 justify-between">
        <h1 className="text-3xl font-bold text-blue-600">Title {id}</h1>
        <Box className="flex px-7 items-center font-semibold rounded-full bg-red-200 text-red-800">
          Priority
        </Box>
      </Flex>
      <Box className="mb-4">
        <h2 className="text-xl font-semibold text-blue-500">Category</h2>
      </Box>
      <Box className="mb-6">
        <h3 className="text-lg font-medium text-blue-400">Report</h3>
      </Box>
      <Box className="mb-4bg-slate-400">
        <Textarea minRows={15} autosize />
      </Box>
      <Box className="flex justify-end mt-16 space-x-4">
        <Button>Submit</Button>
        <Button variant="outline">Cancel</Button>
      </Box>
    </Box>
  );
};

export default page;
