import axios from 'axios'
import React, { useState } from 'react'
import { useParams} from 'react-router-dom';


const UpdateDeliveryStatus = () => {
    const { id } = useParams();
    const [status,setStatus] = useState("delivered")

      const handleChange = (e) =>{
        setStatus(e.targe.value);
        }

        const UpdateStatus=(e)=>{
            e.preventDefault();
            axios.post(`http://localhost:3001/updatedeliverystatus/${id}`,{
             status:status
            }).then((response)=>{
              console.log(response);
              alert("Updated Successfully")
              window.location="http://localhost:3000/serviceorders"
            })
            .catch(error => {
                console.log(error)
            })
        }

  return (
    <div>
      <div className='container mt-3 p-3' style={{width:"600px"}}>
        <div className='row'>
            <h1> Update Food Delivery Status</h1>
            <form onSubmit={UpdateStatus}>
               <div className='mb-3 mt-3' >
                    <label> Update Status</label>
                    <input type='text' name='status' value={status} className='form-control' required onChange={handleChange}/>
                </div>
               
                <input type='submit' className='btn btn-success'/>
            </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateDeliveryStatus
