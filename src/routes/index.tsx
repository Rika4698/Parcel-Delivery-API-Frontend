
import  App from '@/App';
import Error from '@/layout/Error';
// import Home from '@/Public/Home';
import { createBrowserRouter} from 'react-router';



export const router = createBrowserRouter([
  {
    Component: App,
    path: '/',
    errorElement: <Error />,
    // children: [
    //   {
    //     Component: Home,
    //     index: true,
    //   },
      
    // ],
  },
  
]);
