import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { ToastContext } from '../../Context/ToastContext';
interface User{
  id:string;
  userName:string;
}
interface Task {
  id:string;
  title:string;
  description:string;
  employeeId:string;
  employee: {
    id: string;
    name: string;
    
  };
}
export default function EditTask() {
    const { id } = useParams();
    const {register,handleSubmit,formState:{errors},setValue}=useForm<Task>();
    const{baseUrl,reqHeaders}: { baseUrl: string, reqHeaders: Record<string, string> } =useContext(AuthContext)
    const navigate=useNavigate()
    const{getToastValue}=useContext(ToastContext)
    const [users, setUsers] = useState<User[]>([])
    const[isLoading,setIsLoading]=useState(false);

    const updateTask = (data:Task)=>{
      setIsLoading(true)
        axios.put (`${baseUrl}/Task/${id}`,data,{headers:reqHeaders})
        .then(()=>{
        getToastValue('success',"updated Successfully");
        navigate(-1)
        })
        .catch((error)=>{
          getToastValue('error',error?.response?.error?.message||'An error occurred while updating')
        })
        .finally(()=>{
          setIsLoading(false)
        })
       }   
   useEffect(()=>{
    const source = axios.CancelToken.source();
    const showData =()=>{
       
      axios.get<Task>(`${baseUrl}/Task/${id}`,{headers:reqHeaders})
      .then((response)=>{
   
        setValue("title",response?.data?.title)
        setValue("description",response?.data?.description)
        setValue("employeeId",response?.data?.employee?.id)
      }).catch((error)=>{
        getToastValue('error',error?.response?.data?.message||'An error occurred while fetchingData')
      })

    }
    const getUsers = () => {
      axios.get(`${baseUrl}/Users/?groups=2&pageSize=10&pageNumber=1`, { headers: reqHeaders })
      .then((response) => {
        setUsers(response?.data?.data)
  
      }).catch((error) => {
        getToastValue('error', error?.response?.data?.message||'An error occurred while fetchingUsers')
  
      })
    }
    showData();
    getUsers();
    return () => {
      source.cancel("Component unmounted"); 
  };
   },[baseUrl, id, reqHeaders, setValue, getToastValue])


  return (
    <>
    <form onSubmit={handleSubmit(updateTask)} aria-label='Update Task'>
      <div className="container bg-white addHead pb-4 ">
        <div className="col-md-12 ">
          <h3 className='pt-4'>  Update Task</h3>
        </div>
      </div>
      <div className="container">
        <div className="col-md-8  m-auto bg-white mt-4  p-5 rounded-3">
          <div className="inputs w-75 m-auto ">
            <label className='d-block ' htmlFor='title' >Title</label>
            <input id='title' type="text" placeholder='Name' className='form-control  border-2 rounded-5 '
              {...register("title", { required: true })}aria-label="Title"/>
            {errors.title&&errors.title.type==='required'&&(<span className='text-danger'>Title is Required</span>)}
          </div>
          <div className='w-75 m-auto text'>
            <label className='d-block'htmlFor='description' >Description</label>
            <textarea id='description' className='form-control  border-2 rounded-4' cols={20} rows={4} placeholder='description'  {...register("description", { required: true })}   aria-label="Description">
            </textarea>
            {errors.description&&errors.description.type==='required'&&(<span className='text-danger'>Description is Required</span>)}
          </div>
          <select className='form-select me-5 w-25 mt-4 m-auto '    {...register('employeeId', { required: true })}  aria-label="Select Employee">
                {users.map((user, index) => (<option value={user?.id} key={index}>{user?.userName}</option>))}
              </select>
              {errors.employeeId && errors.employeeId.type === 'required' && (<span className='text-danger'> Field is required </span>)}
          <hr />
          <div className="btns d-flex justify-content-between">
            <Link to = '/dashboard/tasks'>
            <button type='button' className='ms-5 rounded-5 border-black bg-white border-1 px-3 text-black' aria-label='cancel'>cancle</button>
            </Link>
            <button type='submit' className='me-5 btn btn-warning text-white bg-warning rounded-5 px-4'aria-label='update' disabled={isLoading}>{isLoading?'Updating...':'update'}</button>
          </div>
        </div>
      </div>
    </form>
  </>
  )
}







 





