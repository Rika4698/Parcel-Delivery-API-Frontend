import Shared from './layout/Shared';
import { Outlet } from 'react-router';

function App() {


  return (
   <Shared>
    <Outlet/>
   </Shared>
  );
}

export default App;
