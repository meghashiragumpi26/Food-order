import axios from 'axios'
import { useState,useEffect } from "react";


const FoodItem = () => {
    const initialValues = {category:"",item_name:"",qty:"",price:""}
    const [formValues,setFormvalues] = useState(initialValues)
    const [file,setFile] = useState("")

    const [CatList, setCatList] = useState([])
    //const utype=localStorage.getItem('log')
    useEffect(() => { 
        getCategory();   
      }, []);
  
      const getCategory = async() => {
        const result = await axios.get("http://localhost:3001/categorylist");
        setCatList(result.data);
        console.log(result.data);
      };

    const handleChange = (e) =>{
        const {name,value}= e.target
        setFormvalues({ ...formValues,[name]:value});
    }

    const setImgFile = (e) =>
    {
       // console.log(e.target.files[0])
        setFile(e.target.files[0])
    }


    
  const AddFoodItem=(e)=>{
    e.preventDefault();
    var formData = new FormData();
    formData.append("file",file)
    formData.append("category",formValues.category)
    formData.append("item_name",formValues.item_name)
    formData.append("qty",formValues.qty)
    formData.append("price",formValues.price)
    console.log(...formData)
    const config = {
        headers:
        {
            "Content-Type":"multipart/form-data"
        }    
     }
    axios.post("http://localhost:3001/fooditem",
    formData,config
    ).then((response)=>{
      console.log(response);
    })
    .catch(error => {
        console.log(error)
    })
} 

    


  return (
    <div>
        <div className='container mt-2 p-3'>
            <div className='row'>
                <h1> Add Food Item</h1>
                <form onSubmit={AddFoodItem}>
                <div className='mb-3 mt-3'>
                <select name='category' className='form-control' defaultValue={formValues.category} onChange={handleChange}>
                <option>--select category--</option>
                {
                CatList.map((cat,index) => {
                return(
                     
                <option key={cat.id} value={cat.category_name}>{cat.category_name}</option>
                )
                })
                }

            </select>
                    {/* <input type='text' value={formValues.category} name='category' className='form-control' 
                    placeholder='Enter Category' onChange={handleChange} required/> */}
                </div>
                <div className='mb-3'>
                    <input type='text' value={formValues.item_name} name='item_name' className='form-control' 
                    placeholder='Enter Item Name' onChange={handleChange} required/>
                </div>
                <div className='mb-3'>
                    <input type='number' value={formValues.qty} min={1} name='qty' className='form-control' 
                    placeholder='Enter Quantity' onChange={handleChange} required/>
                </div>
                <div className='mb-3'>
                    <input type='number' value={formValues.price} max={800} min={10} name='price' className='form-control' 
                    placeholder='Enter Price' onChange={handleChange} required/>
                </div>
                <div className='mb-3'>
                    <input type='file' name='file' className='form-control'  onChange={setImgFile} required/>
                </div>
                <input type='submit' className='btn btn-primary'/>
                </form>
            </div>


        </div>
      
    </div>
  )
}

export default FoodItem
