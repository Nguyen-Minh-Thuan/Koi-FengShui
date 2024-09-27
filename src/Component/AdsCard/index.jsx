import React from 'react'
import Header from '../Header_Admin/header'
import Content from '../AdsList/'
import AdminNavbar from '../../assets/AdminNavbar'

const AdsCard = () => {
    return (
      <div>
          <Header/>       
          <div className='flex'>
          <AdminNavbar/>
          <Content/> 
          </div>   
               
      </div>
    )
  };
  
  export default AdsCard