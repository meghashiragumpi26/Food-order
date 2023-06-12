import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams} from 'react-router-dom';

const CatWise = () => {
    const { cat } = useParams();
    const [FoodList, setFoodList] = useState([])

    useEffect(() => { 
        getCatWiseFoods();   
      });
  
      const getCatWiseFoods = async() => {
        const result = await axios.get(`http://localhost:3001/cat_wise_menu/${cat}`);
        setFoodList(result.data);
        console.log(result.data);
      };


  return (
    <div>

<div className='container-fluid bg-light mt-3 p-3'>
        <div className='row'>
            <h3 className='text-danger'>List of {cat} Items</h3>
            <div className="divider py-1 bg-success"></div>
            {
              FoodList.map((food,index) => {
            
            return(
              <>
              
            <div className='col-lg-3 mt-3' >
                <input type='hidden' value={index+1}></input>
                <h2 key={food.id}> {food.item_name}</h2>
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

export default CatWise
