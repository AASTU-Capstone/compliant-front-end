import { Box } from "@mantine/core";
import ComplaintsLogBody from "./table";

export interface Data {
  id: string;
  title: string;
  priority: string;
  subordinate: string;
  manager: string;
  createdDate: string;
}

const data: Data[] = [
  {
    id: "1",
    title: "David Wagner",
    priority: "high",
    subordinate: "dad lad",
    createdDate: "24 Oct, 2015",
    manager: "Lorem Ipsum",
  },
  {
    id: "2",
    title: "Ina Hogan",
    priority: "medium",
    subordinate: "dad lad",
    createdDate: "24 Oct, 2015",
    manager: "Lorem Ipsum",
  },
  {
    id: "3",
    title: "Devin Harmon",
    priority: "low",
    subordinate: "dad lad",
    createdDate: "18 Dec, 2015",
    manager: "Lorem Ipsum",
  },
  {
    id: "4",
    title: "Lena Page",
    priority: "medium",
    subordinate: "dad lad",
    createdDate: "8 Oct, 2016",
    manager: "Lorem Ipsum",
  },
  {
    id: "5",
    title: "Eula Horton",
    priority: "high",
    subordinate: "dad lad",
    createdDate: "15 Jun, 2017",
    manager: "Lorem Ipsum",
  },
  {
    id: "6",
    title: "Victoria Perez",
    priority: "high",
    subordinate: "dad lad",
    createdDate: "12 Jan, 2019",
    manager: "Lorem Ipsum",
  },
  {
    id: "7",
    title: "Cora Medina",
    priority: "low",
    subordinate: "dad lad",
    createdDate: "21 July, 2020",
    manager: "Lorem Ipsum",
  },
];

const ComplaintsLog = () => {
  return (
    <Box className="w-full bg-primary-background">
      <ComplaintsLogBody data={data} />
    </Box>
  );
};

export default ComplaintsLog;
