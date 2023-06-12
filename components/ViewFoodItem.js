import React from 'react'
import { useState,useEffect } from "react";
import axios from "axios";

const ViewFoodItem = () => {
    const [FoodData, setFoodData] = useState([])
    useEffect(() => { 
        getFoodItem();  
    });
      
    const getFoodItem = async() => {
        const result = await axios.get(`http://localhost:3001/viewfooditem`);
        setFoodData(result.data);
        console.log(result.data);
          };

          const DeleteFood = id => {
            //alert(id)
            axios.delete(`http://localhost:3001/deletefood/${id}`)
            .then(response => {
                getFoodItem();
            
            });
          }
    
  return (
    <div>
      <div className='container-fluid mt-2'>

         <div className='row'>
            <h1> Food Item Details </h1>
            <table className='table table-bordered table-hover mt-2'>
               <thead className='table-primary'>
                 <tr>
                    <th> # </th>
                    <th>Category</th>
                    <th> Item Name </th>
                    <th> Qty </th>
                    <th> Price</th>
                    <th> Image </th>
                    <th> Action </th>
                 </tr>
               </thead>

               <tbody>
               {
                 FoodData.map((data,index) => {
                return(<tr key={data.id}>
                    <td>{index+1}</td>
                    <td>{data.category} </td>
                    <td>{data.item_name}</td>
                    <td>{data.qty} </td>
                    <td>{data.price} </td>
                    <td><img src={`../upload/${data.file}`} alt='not found' width={100} height={100}></img> </td>
                    <td> <i className='fa fa-trash' onClick={() => DeleteFood(data.id)}></i></td>
                </tr>)
             })
              }
                </tbody> 
            </table>

         </div>


      </div>
    </div>
  )
}

export default ViewFoodItem
