import type { ISidebarItem } from "@/types";
import { lazy } from 'react';
const Analytics = lazy(() => import('@/pages/Admin/Analytics'));
const AllParcels = lazy(() => import('@/pages/Admin/AllParcels'));
const AllUsers = lazy(() => import('@/pages/Admin/UsersList'));
const ContactMessage = lazy(() => import('@/pages/Admin/ContactMessage'));


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
      {
        title: 'All Users',
        url: '/admin/users',
        component: AllUsers,
      },
         {
        title: 'Messages',
        url: '/admin/contact-message',
        component: ContactMessage,
      },
  
    ],
  }
];