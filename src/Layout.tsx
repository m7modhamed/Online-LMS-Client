import { Outlet } from 'react-router-dom'; // To render the current route's component
import {NavBar2} from './components/NavBar2/index';
import Navbar from './components/navbar';

const Layout = () => {

  const navbarHeight = '80px'; // Adjust to match the navbar's actual height

  return (
    <div>
      {/* <NavBar2 />  */}
      <Navbar/>
      <main style={{marginTop: navbarHeight, minHeight: '85vh' , display : 'flex'}}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
