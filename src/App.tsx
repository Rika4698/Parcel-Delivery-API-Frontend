import ScrollToTop  from './layout/ScrollToTop';
import Shared from './layout/Shared';
import { Outlet } from 'react-router';

function App() {


  return (
    <>
    <ScrollToTop/>
   <Shared>
    <Outlet/>
   </Shared>
    </>

  );
}

export default App;
