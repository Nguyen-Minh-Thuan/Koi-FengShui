

import Content from '../../Component/AdsList/'
import AdminNavbar from '../../Component/AdminNavbar/'
import AdminHeader from '../../Component/HeaderAdmin';

const AdminPage = () => {

  return (
    <div>
          <AdminHeader/>       
          <div className='flex'>
          <AdminNavbar/>
          <Content/> 
          </div>         
      </div>
  );
}

export default AdminPage;
