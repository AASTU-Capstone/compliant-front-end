import React from "react";
import AssignComplaintTable from "./table";

export interface Data {
  id: string;
  title: string;
  status: string;
  createdDate: string;
  category: string;
}

const data: Data[] = [
  {
    id: "1",
    title: "David Wagner",
    status: "Resolved",
    createdDate: "24 Oct, 2015",
    category: "Lorem Ipsum",
  },
  {
    id: "2",
    title: "Ina Hogan",
    status: "Inprogress",
    createdDate: "24 Oct, 2015",
    category: "Lorem Ipsum",
  },
  {
    id: "3",
    title: "Devin Harmon",
    status: "Rejected",
    createdDate: "18 Dec, 2015",
    category: "Lorem Ipsum",
  },
  {
    id: "4",
    title: "Lena Page",
    status: "Received",
    createdDate: "8 Oct, 2016",
    category: "Lorem Ipsum",
  },
  {
    id: "5",
    title: "Eula Horton",
    status: "Inprogress",
    createdDate: "15 Jun, 2017",
    category: "Lorem Ipsum",
  },
  {
    id: "6",
    title: "Victoria Perez",
    status: "Inprogress",
    createdDate: "12 Jan, 2019",
    category: "Lorem Ipsum",
  },
  {
    id: "7",
    title: "Cora Medina",
    status: "Received",
    createdDate: "21 July, 2020",
    category: "Lorem Ipsum",
  },
];

const page: React.FC = () => {
  return <AssignComplaintTable data={data} />;
};

export default page;
