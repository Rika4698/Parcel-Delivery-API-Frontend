
import  App from '@/App';
import { Role } from '@/constants/role';
import Dashboard from '@/layout/Dashboard';
import Error from '@/layout/Error';
import LogIn from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Home from '@/Public/Home';
import type { TRole } from '@/types';
import { Auth } from '@/utils/Auth';
import { GenerateRoutes } from '@/utils/GenerateRoutes';
import { createBrowserRouter, Navigate} from 'react-router';
import { adminSidebar } from './adminSidebar';
import { senderSidebar } from './senderSidebar';
import { receiverSidebar } from './receiverSidebar';
import About from '@/Public/About';
import Contact from '@/Public/Contact';
import TrackParcel from '@/Public/TrackParcel';



export const router = createBrowserRouter([
  {
    Component: App,
    path: '/',
    errorElement: <Error />,
    children: [
      {
        Component: Home,
        index: true,
      },
     {
        Component: TrackParcel,
        path: 'track-parcel',
      },
      {
        Component: About,
        path: 'about',
      },
      {
        Component: Contact,
        path: 'contact',
      },
      
 
    ],
  },
   {
    Component: Auth(
      Dashboard,
      (Role.superAdmin && Role.admin) as TRole
    ),
    path: '/admin',
    children: [
      { index: true, element: <Navigate to={'/admin/analytics'} /> },
      ...GenerateRoutes(adminSidebar),
    ],
  },
    {
    Component: Auth(Dashboard, Role.sender as TRole),
    path: '/sender',
    children: [
      { index: true, element: <Navigate to={'/sender/parcels'} /> },
      ...GenerateRoutes(senderSidebar),
    ],
  },
   {
    Component: Auth(Dashboard, Role.receiver as TRole),
    path: '/receiver',
    children: [
      { index: true, element: <Navigate to={'/receiver/incoming-parcels'} /> },
      ...GenerateRoutes(receiverSidebar),
    ],
  },
   {
    Component: LogIn,
    path: 'login',
  },
   {
    Component: Register,
    path: 'register',
  },
]);
