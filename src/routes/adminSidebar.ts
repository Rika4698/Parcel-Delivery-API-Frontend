import type { ISidebarItem } from "@/types";
import { lazy } from 'react';
const Analytics = lazy(() => import('@/pages/Admin/Analytics'));
const AllParcels = lazy(() => import('@/pages/Admin/AllParcels'));

export const adminSidebar: ISidebarItem[] = [
  {
    title: 'Dashboard',
    items: [
       {
        title: 'Analytics',
        url: '/admin/analytics',
        component: Analytics,
      },
      {
        title: 'All Parcels',
        url: '/admin/parcels',
        component: AllParcels,
      },
  
    ],
  }
];