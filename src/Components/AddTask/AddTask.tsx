import axios from 'axios'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

export default function AddProject() {
 const navigate= useNavigate()
const {register,handleSubmit,formState:{errors}}=useForm()
const{baseUrl,reqHeaders}:any=useContext(AuthContext)
const AddProject =(data)=>{
axios.post(`${baseUrl}/Task`,data,
{headers:reqHeaders}).then((response)=>{
  navigate(-1)
}).catch((error)=>{
  console.log(error);
  
})

}
  return (
    <>
    <form onSubmit={handleSubmit(AddProject)} >
    <div className="container bg-white addHead pb-4">
    <div className="col-md-12">
      <div>
        <h5 className="p-3 m-auto" onClick={()=>navigate(-1)}>
        <i className="fa-solid fa-chevron-left pe-2"> </i>
        view All Tasks
        </h5>
      <h3> New Task</h3>
      </div>
    </div>
  </div>
  <div className="container">
<div className="col-md-8  m-auto bg-white mt-4  p-5 rounded-3">
  <div className="inputs m-auto ">
    <label className='d-block fw-bolder ' >Title</label>
    <input type="text" placeholder='Name' className='form-control  border-2 rounded-2 ' 
    {...register('title',{required:true})}
    />
    </div>
    <div className='w-100 p-3 m-auto text'>

    
    <label className='d-block fw-bolder' >Description</label>
   <textarea className='form-control  border-2 rounded-2' cols="20" rows="4"   {...register("description",{required:true})} >Description
   </textarea>


   <div className="inputs m-auto justify-content-between d-flex pt-3" >
  <div className="input-group">
    <label className='d-block fw-bolder ' htmlFor="userInput">User</label>
    <input
      type="text"
      id="userInput"
      placeholder='Select user'
      className='border-2 rounded-2'
      {...register('user', { required: true })}
    />
  </div>

  <div className="input-group">
    <label className='d-block fw-bolder' htmlFor="projectsInput">Projects</label>
    <input
      type="text"
      id="projectsInput"
      placeholder='Select status'
      className='border-2 rounded-2'
      {...register('projects', { required: true })}
    />
  </div>
</div>

   </div>
   <hr className='' />
   <div className="btns d-flex justify-content-between">
    <button className='ms-5 rounded-5 border-black bg-white border-1 px-3 text-muted'>cancel</button>
    <button className='me-5 btn btn-warning text-white bg-warning rounded-5 px-4'>save</button>
   </div>
 
</div>
  </div>
    </form>
  
    </>


  )
}
