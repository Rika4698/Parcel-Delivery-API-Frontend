
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
      
 
    ],
  },
   {
    Component: Auth(
      Dashboard,
      (Role.superAdmin && Role.admin) as TRole
    ),
    path: '/admin',
    children: [
      { index: true, element: <Navigate to={'/admin'} /> },
      ...GenerateRoutes(adminSidebar),
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
