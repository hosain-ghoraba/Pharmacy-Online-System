import DashboardIcon from "@mui/icons-material/Dashboard";
import HealingIcon from "@mui/icons-material/Healing";
import ListAltIcon from "@mui/icons-material/ListAlt";

import { SidebarItem } from "../../types";
import {
  patientDashboardRoute,
  viewMedicinesRoute,
  viewOrdersRoute,
} from "../routes/patientRoutes";

/**
 * One href for each patient page route.
 */
export const patientSidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    href: patientDashboardRoute.path,
    icon: <DashboardIcon />,
  },
  {
    title: "View Medicines",
    href: viewMedicinesRoute.path,
    icon: <HealingIcon />,
  },
  {
    title: "View Orders",
    href: viewOrdersRoute.path,
    icon: <ListAltIcon />,
  },
];

export default patientSidebarItems;
