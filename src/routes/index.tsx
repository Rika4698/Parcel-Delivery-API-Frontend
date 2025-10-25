
import  App from '@/App';
import Error from '@/layout/Error';
import LogIn from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Home from '@/Public/Home';
import { createBrowserRouter} from 'react-router';



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
    Component: LogIn,
    path: 'login',
  },
   {
    Component: Register,
    path: 'register',
  },
]);
