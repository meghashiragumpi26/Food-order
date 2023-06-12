import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
const utype=localStorage.getItem('log')


const Navbar = () => {
  const [CategoryList, setCategoryList] = useState([])

  const logout= ()=>{
    localStorage.clear()
    window.location = 'http://localhost:3000/login';
  }

   useEffect(() => { 
     getCategory();   
   }, []);

   const getCategory = async() => {
     const result = await axios.get("http://localhost:3001/categorylist");
     setCategoryList(result.data);
     console.log(result.data);
   };


  if(utype==="user")
  {
  return (
    <div>
      <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
            <div className='container-fluid'>
                <span className='text-brand text-white fs-2'>FoodCart</span>
                <ul className='navbar-nav'>
                    <li className='nav-item'><a href='/userhome'  className='nav-link'> Home </a></li>
                    
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="/userhome" role="button" data-bs-toggle="dropdown">Food Menu</a>

                    <ul class="dropdown-menu">
                    {
                      CategoryList.map((cat,index) => {
                        let loc = "http://localhost:3000/cat_wise_menu/"+cat.category_name;
                        return(<li key={cat.id}><a className="dropdown-item" href={loc}>{cat.category_name}</a></li>)
                      
                    }
                    )}
                    
                  </ul>
      </li>
                    <li className='nav-item'><a href='/myorder'  className='nav-link'> Orders </a></li>
                    <li className='nav-item'><a href='/feedback'  className='nav-link'> Give Feedack </a></li>
                    <li className='nav-item'><button className='btn btn-danger' onClick={logout}> Logout </button> </li>
                   
                </ul>
            </div>
        </nav>
    </div>
  )
}


else if(utype==="admin")
{
return (
  <div>
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
          <div className='container-fluid'>
              <span className='text-brand text-white fs-2'>DashBoard|Admin</span>
              <ul className='navbar-nav'>
                  <li className='nav-item'><a href='/adminhome'  className='nav-link'> Home </a></li>
                  <li className='nav-item'><a href='/fooditem'  className='nav-link'> Food Item </a></li>
                  <li className='nav-item'><a href='/addcat'  className='nav-link'>  Category </a></li>
                  <li className='nav-item'><a href='/viewfooditem'  className='nav-link'> View Food Item </a></li>
                  <li className='nav-item'><a href='/customerordersall'  className='nav-link'> All Orders </a></li>
                  <li className='nav-item'><a href='/viewfeedback'  className='nav-link'> Feedback </a></li>
                  <li className='nav-item'><button className='btn btn-danger' onClick={logout}> Logout </button> </li>
              </ul>
          </div>
      </nav>
  </div>
)
}


else if(utype==="service")
{
return (
  <div>
    <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
          <div className='container-fluid'>
              <span className='text-brand text-white fs-2'>DashBoard|Food Service</span>
              <ul className='navbar-nav'>
                  <li className='nav-item'><a href='/servicehome'  className='nav-link'> Home </a></li>
                  <li className='nav-item'><a href='/serviceorders'  className='nav-link'> Orders </a></li>
                  <li className='nav-item'><a href='/viewfeedback'  className='nav-link'> Feedback </a></li>
                  <li className='nav-item'><button className='btn btn-danger' onClick={logout}> Logout </button> </li>
              </ul>
          </div>
      </nav>
  </div>
)
}

else 
{

  return (
    <div>
      <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
            <div className='container-fluid'>
                <span className='text-brand text-white fs-2'>FoodCart</span>
                <ul className='navbar-nav'>
                    <li className='nav-item'><a href='/'  className='nav-link'> Home </a></li>
                    <li className='nav-item'><a href='/about'  className='nav-link'> About </a></li>
                    <li className='nav-item'><a href='/contact'  className='nav-link'> Contact </a></li>
                    <li className='nav-item'><a href='/signup'  className='nav-link'> SignUp </a></li>
                    <li className='nav-item'><a href='/login'  className='nav-link'> Login </a></li>
                    
                </ul>
            </div>
        </nav>
      
    </div>
  )

}
}

export default Navbar
