import React from 'react'
//import logo from "../Assets/b3.png"
import { useState,useEffect } from "react";
import axios from "axios";

const UserHome = () => {
    const getuseremail=localStorage.getItem('user')
    const [FoodList, setFoodList] = useState([])
    //const utype=localStorage.getItem('log')

    useEffect(() => { 
        getFoods();   
      }, []);
  
      const getFoods = async() => {
        const result = await axios.get("http://localhost:3001/home");
        setFoodList(result.data);
        console.log(result.data);
      };

  return (
    <div>
      <div className='container-fluid bg-warning mt-3 p-3'>
        <div className='row'>
            <h1 className='text-white'>Food Order System</h1>
            <p><button className='btn btn-warning text-white'> Welcome: {getuseremail} </button></p>
        </div>
     </div>

     <div className='container-fluid bg-light mt-3 p-3'>
        <div className='row'>
            <h3 className='text-danger'>List of Menu Items</h3>
            <div className="divider py-1 bg-success"></div>
            {
              FoodList.map((food,index) => {
            
            return(
              <>
              
            <div className='col-lg-3 mt-2' >
                <input type='hidden' value={index+1}></input>
                <h2 key={food.id}> {food.category}</h2>
                <p> <img src={`../upload/${food.file}`} alt='not found' width={200} height={200}></img></p>
                <p> ₹ {food.price}/-</p>
                <p> <button className='btn btn-danger text-white'><a href={`/sendorder/${food.id}`} style={{textDecoration:"none",color:"white"}}> Buy </a> </button></p>
            </div>
            </>
            )
            }
              )};
           
        </div>
     </div>
    </div>
  )
}

export default UserHome
