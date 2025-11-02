import type { ISidebarItem } from "@/types";
import { lazy } from 'react';
const Analytics = lazy(() => import('@/pages/Admin/Analytics'));

export const adminSidebar: ISidebarItem[] = [
  {
    title: 'Dashboard',
    items: [
       {
        title: 'Analytics',
        url: '/admin/analytics',
        component: Analytics,
      },
  
    ],
  }
];