import {
  IconAlignBoxLeftTop,
  IconFileDescription,
  IconFiles,
  IconLayoutDashboard,
  IconTextPlus,
  IconUserHexagon,
  IconUserShare,
} from "@tabler/icons-react";
export const linksData = [
  {
    role: "user",
    link: "/dashboard",
    label: "Dashboard",
    icon: IconLayoutDashboard,
  },
  {
    role: "user",
    link: "/complaints",
    label: "Complaints",
    icon: IconAlignBoxLeftTop,
  },
  { role: "user", link: "/resources", label: "Resources", icon: IconFiles },
  {
    role: "admin",
    link: "/admin/dashboard",
    label: "Dashboard",
    icon: IconLayoutDashboard,
  },
  {
    role: "admin",
    link: "/admin/complaints",
    label: "Complaints",
    icon: IconFiles,
  },
  {
    role: "admin",
    link: "/admin/complaint-log",
    label: "Complaint Log",
    icon: IconFileDescription,
  },
  {
    role: "admin",
    link: "/admin/assign-complaint",
    label: "Assign Complaint",
    icon: IconTextPlus,
  },
  {
    role: "admin",
    link: "/admin/managers",
    label: "Managers",
    icon: IconUserHexagon,
  },

  {
    role: "manager",
    link: "/manager/dashboard",
    label: "Dashboard",
    icon: IconLayoutDashboard,
  },
  {
    role: "manager",
    link: "/manager/complaint-log",
    label: "Complaint Log",
    icon: IconFileDescription,
  },
  {
    role: "manager",
    link: "/manager/subordinates",
    label: "Subordinates",
    icon: IconUserHexagon,
  },
  {
    role: "manager",
    link: "/manager/assign-subordinate",
    label: "Assign Subordinate",
    icon: IconUserShare,
  },
  {
    role: "subordinate",
    link: "/subordinate/dashboard",
    label: "Dashboard",
    icon: IconLayoutDashboard,
  },
  {
    role: "subordinate",
    link: "/subordinate/complaint-log",
    label: "Complaint Log",
    icon: IconFileDescription,
  },
];
