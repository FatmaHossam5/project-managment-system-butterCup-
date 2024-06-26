import axios from 'axios'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { ToastContext } from '../../Context/ToastContext'
import styles from './AddProject.module.css'
interface FormData {
  title: string;
  description: string;
}




export default function AddProject() {
 const navigate= useNavigate()
const {register,handleSubmit,formState:{errors}}=useForm<FormData>()
let{baseUrl,reqHeaders}:any=useContext(AuthContext)
const{getToastValue}= useContext(ToastContext);

const AddProject =(data:FormData)=>{
axios.post(`${baseUrl}/project`,data,{headers:reqHeaders}).then(()=>{
getToastValue('success','Added Successfully')
  navigate(-1)
}).catch((error)=>{
  getToastValue('error',error?.response?.data?.message)
})
}

const handleClose =()=>{
navigate(-1)
}
  return (
    <>
    <form onSubmit={handleSubmit(AddProject)} >
    <div className="container bg-white addHead pb-4 ">
    <div className="col-md-12">
      <div className='mt-4'>
        <h5 onClick={()=>navigate(-1)}>
        <i className="fa-solid fa-chevron-left pe-2"> </i>
        view All Project
        </h5>


      <h3>Add a New Project</h3>
      </div>
    </div>
  </div>
  <div className="container">
<div className="col-md-8  m-auto bg-white mt-4  p-4 rounded-3">
  <div className="inputs w-75 m-auto ">
    <label className='d-block ' >Title</label>
    <input type="text" placeholder='Name' className='form-control  border-2 rounded-5 ' 
    {...register('title',{required:true})}
    />
    {errors.title&&errors.title.type==='required'&&(<span className='text-danger'> Title is required </span>)}
    </div>
    <div className='w-75 m-auto text'>
    <label className='d-block' >Description</label>
   <textarea className='form-control  border-2 rounded-4' cols={20} rows={4} placeholder='Description'   {...register("description",{required:true})} >
   </textarea>
   {errors.description&&errors.description.type==='required'&&(<span className='text-danger'> description is required </span>)}

   </div>
   <hr  />
   <div className="btns d-flex justify-content-between">
    <button  onClick={handleClose} className={`${styles['hover-effect']} ms-5 rounded-5 border-black bg-white border-1 px-3 text-black `}>cancel</button>
    <button  className='me-5 btn btn-warning text-white bg-warning rounded-5 px-4 hover-effect'>save</button>
   </div>
</div>
  </div>
    </form>
    
    </>
  )
}
