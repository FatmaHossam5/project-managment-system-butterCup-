import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function EditProject() {
  const {id}:any=useParams();

   const {register,handleSubmit,formState:{errors},setValue}=useForm();
   const{baseUrl,reqHeaders}:any=useContext(AuthContext)
 const navigate=useNavigate()
 
   const updatePro = (data)=>{
    axios.put (`${baseUrl}/project/${id}`,data,{headers:reqHeaders}).then((response)=>
    {

      console.log(response);
    navigate(-1)
    }).catch((error)=>{
      console.log(error);
      
    })
   }
   const showData =()=>{
    axios.get(`${baseUrl}/project/${id}`,{headers:reqHeaders}).then((response)=>{
      setValue("title",response?.data?.title)
      setValue("description",response?.data?.description)
  
    })
  }
   
  
   useEffect(()=>{
    showData()
   },[])

  return (
    <>
    
    <form  onSubmit={handleSubmit(updatePro)}>
    <div className="container bg-white addHead pb-4 ">
    <div className="col-md-12 ">
      
      <h3 className='pt-4'>  Update Project</h3>
      
    </div>
  </div>
  <div className="container">
<div className="col-md-8  m-auto bg-white mt-4  p-5 rounded-3">
  <div className="inputs w-75 m-auto ">
    <label className='d-block ' >Title</label>
    <input type="text" placeholder='Name' className='form-control  border-2 rounded-5 ' 
   
   {...register("title",{required:true})}
    />
    </div>
    <div className='w-75 m-auto text'>

    
    <label className='d-block' >Description</label>
  
   <textarea className='form-control  border-2 rounded-4' cols="20" rows="4"  placeholder='description'  {...register("description",{required:true})}  >Description
 

   </textarea>
 

   </div>
   <hr className='' />
   <div className="btns d-flex justify-content-between">
    <button  className='ms-5 rounded-5 border-black bg-white border-1 px-3 text-black'>cancle</button>
    <button  className='me-5 btn btn-warning text-white bg-warning rounded-5 px-4'>Update</button>
   </div>
 
</div>
  </div>
    </form>
    
    </>
  )
  
}