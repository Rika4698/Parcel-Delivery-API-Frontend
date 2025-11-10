
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
const InComingParcels = lazy(() => import("@/pages/Receiver/InComingParcels"));
const AllDeliveredParcels = lazy(() => import("@/pages/Receiver/AllDeliveredParcels"));
const UserProfile = lazy(() => import('@/components/UserProfile'));

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
  {
    title: 'User Profile',
    items: [
      {
        title: 'Profile',
        url: '/receiver/Profile',
        component: UserProfile,
      },
    ],
  },
  
];