
import type { ISidebarItem } from "@/types";
import { lazy } from 'react';
const Parcels = lazy(() => import('@/pages/Sender/Parcel'));




export const senderSidebar: ISidebarItem[] = [
 {
    title: 'Dashboard',
    items: [
      {
        title: 'Parcels',
        url: '/sender/parcels',
        component: Parcels,
      },
    ],
  },
];