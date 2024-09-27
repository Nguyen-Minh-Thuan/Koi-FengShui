
import Header from '../../Component/HeaderAdmin'
import Content from '../../Component/AdsList/'
import AdminNavbar from '../../Component/AdminNavbar/'

const index = () => {

  return (
    <div>
          <Header/>       
          <div className='flex'>
          <AdminNavbar/>
          <Content/> 
          </div>         
      </div>
  );
}

export default index;
