import React from 'react'
import { useParams} from 'react-router-dom';
import axios from "axios";
let uid=localStorage.getItem('user');
const PayBill = () => {
    const { id } = useParams();
    const {price} = useParams();
    console.log(id)
    console.log(price)

    const paymentHandler = async (e) => {
        e.preventDefault();

        var options={
          key:"rzp_test_aRwvKMa3LOdILg",
          key_secret:"bceCS0Mx0iWwM9OafcFtFvu3",
          amount:price*100,
          currency:"INR",
          name:"AquaFresh Food Order",
          description:"For testing purpose",
          handler:function(response){
            //alert(response.razorpay_payment_id)
            axios.post(`http://localhost:3001/paybill/${id}`,{
              price:price,
              payment_id:response.razorpay_payment_id,
              uid:uid
             }).then((response)=>{
               console.log(response);
               alert("Payment has been done successfully")
               window.location="http://localhost:3000/myorder"
             })
             .catch(error => {
                 console.log(error)
             })
          },
          prefill:{
            name:"Gururaj",
            email:"g7892712433@gmail.com",
            contact:"7892712433",
          },

          notes:{
            address:"Razorpay Corporate Office",
          },
          theme:{
            color: "#686CFD",
          }
        };
        var pay=new window.Razorpay(options);
        pay.open()

       
  };
    
  return (
    <div>
      <h1> Pay Order Bill Amount </h1>
      
      <button onClick={paymentHandler}>Pay Now</button>

    </div>
  )
}

export default PayBill
