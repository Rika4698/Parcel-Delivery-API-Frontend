
import { Role } from "@/constants/role";
import { adminSidebar } from "@/routes/adminSidebar";
import type { TRole } from "@/types";
import { senderSidebar } from "@/routes/senderSidebar";

export const SidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case Role.superAdmin:
      return [...adminSidebar];
    case Role.admin:
      return [...adminSidebar];
    case Role.sender:
      return [...senderSidebar];  
  
    default:
      return [];
  }
};