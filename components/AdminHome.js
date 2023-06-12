import React from 'react'
//import logo from "../Assets/b3.png"
import { useState,useEffect } from "react";
import axios from "axios";

const AdminHome = () => {
    const [OrderList, setOrderList] = useState([])
    //const utype=localStorage.getItem('log')

    useEffect(() => { 
        getOrders();   
      }, []);
  
      const getOrders = async() => {
        const result = await axios.get("http://localhost:3001/allorders");
        setOrderList(result.data);
        console.log(result.data);
      };

      const DeleteOrder = id => {
        //alert(id)
        axios.delete(`http://localhost:3001/delorderbyadmin/${id}`)
        .then(response => {
            getOrders();
        
        });
      }

      const AddDelivery = id => {
        //alert(id)
        axios.post(`http://localhost:3001/sendtodelivery/${id}`)
        .then(response => {
            getOrders();
        
        });
      }

  return (
    <div>
      <div className='container-fluid bg-success mt-3 p-3'>
        <div className='row'>
            <h1 className='text-white'>Welcome To Admin Panel</h1>
            <p><button className='btn btn-warning text-dark'> {new Date().toLocaleString() + ""} </button></p>
        </div>
     </div>

     <div className='container-fluid bg-light mt-3 p-3'>
        <div className='row'>
            <table className='table table-bordered'>
            <thead className='table-dark'>
                        <tr>
                            <th>#</th>
                            <th> Order Id</th>
                            <th> Item Name</th>
                            <th> Qty</th>
                            <th> Price </th>
                            <th> Total </th>
                            <th> Order Date</th>
                            <th> Order Time </th>
                            <th> Order Status </th>
                            <th> payment Status </th>
                            <th colSpan={2} align='center' className='bg-danger'> Delivered Status </th>
                            
                        </tr>
                    </thead>
                    <tbody> 
                    {
                      OrderList.map((mo,index) => {
                        let message
                        if(mo.delivered_status==="progressing"){
                          message = <div className='text-primary fs-4 fw-bold'> progressing  </div>
                        }
                        else if(mo.delivered_status==="delivered")
                        {
                          message = <div className='text-primary fs-4 fw-bold'> delivered  </div>
                        }
                        else
                        {
                          message = <button className='btn btn-danger' onClick={()=>AddDelivery(mo.id)}> Add to Delivery </button>
                        }
            return(<tr key={mo.id}>
              <td>{index+1}</td>
              <td><a href={`/viewcustomer/${mo.user_id}`}> {mo.id} </a> </td>
              <td>{mo.item_name}</td>
              <td>{mo.qty}</td>
              <td>{mo.price}</td>
              <td>{mo.total}</td>
              <td>{mo.order_date}</td>
              <td>{mo.order_time}</td>
              <td className='text-success fs-4 fw-bold'>{mo.order_status}</td>
              <td className='text-primary fs-4 fw-bold'>{mo.payment_status}</td>
              <td> <i className='fa fa-trash' onClick={() => DeleteOrder(mo.id)}> </i></td>
              <td>{message} </td>
             
            </tr>
        
            )
            }
              )}
                         
        </tbody>
            </table>
            
     </div>
    </div>
    </div>
  )
}

export default AdminHome
