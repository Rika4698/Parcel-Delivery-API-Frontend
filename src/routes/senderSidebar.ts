
import type { ISidebarItem } from "@/types";
import { lazy } from 'react';
const Parcels = lazy(() => import('@/pages/Sender/Parcel'));
const UserProfile = lazy(() => import('@/components/UserProfile'));




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
  {
    title: 'User Profile',
    items: [
      {
        title: 'Profile',
        url: '/sender/Profile',
        component: UserProfile,
      },
    ],
  },
];