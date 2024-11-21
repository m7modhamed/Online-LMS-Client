import { Outlet } from 'react-router-dom'; // To render the current route's component
import Navbar from './components/navbar';

const Layout = () => {
  return (
    <div>
      <Navbar /> 
      <main style={{ padding: '20px' }}>
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
