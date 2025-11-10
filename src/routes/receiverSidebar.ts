
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const InComingParcels = lazy(() => import("@/pages/Receiver/InComingParcels"));


export const receiverSidebar: ISidebarItem[] = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'InComing Parcels',
        url: '/receiver/incoming-parcels',
        component: InComingParcels,
      },
  
    ],
  },
  
];