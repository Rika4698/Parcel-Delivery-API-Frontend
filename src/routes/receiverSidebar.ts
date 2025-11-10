
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const InComingParcels = lazy(() => import("@/pages/Receiver/InComingParcels"));
const AllDeliveredParcels = lazy(() => import("@/pages/Receiver/AllDeliveredParcels"));

export const receiverSidebar: ISidebarItem[] = [
  {
    title: 'Dashboard',
    items: [
      {
        title: 'InComing Parcels',
        url: '/receiver/incoming-parcels',
        component: InComingParcels,
      },
       {
        title: 'Delivered & Cancelled',
        url: '/receiver/all-delivered-parcels',
        component: AllDeliveredParcels,
      },
  
    ],
  },
  
];