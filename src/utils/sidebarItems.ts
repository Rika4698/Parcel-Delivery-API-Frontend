
import { Role } from "@/constants/role";
import { adminSidebar } from "@/routes/adminSidebar";
import type { TRole } from "@/types";

export const SidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case Role.superAdmin:
      return [...adminSidebar];
    case Role.admin:
      return [...adminSidebar];
  
    default:
      return [];
  }
};