import axios from 'axios'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { ToastContext } from '../../Context/ToastContext'
import styles from './AddTask.module.css'
interface User{
  id:string;
  userName:string;
 
}
interface Project{
  id:string;
  title:string;
}
export default function AddTask() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { baseUrl, reqHeaders }: {baseUrl:string,reqHeaders:Record<string,string>} = useContext(AuthContext)
  const { getToastValue } = useContext(ToastContext);
  const [users, setUsers] = useState<User[]>([])
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false);





  {/* Add  Task*/ }
  const AddTask = (data:any) => {
    setIsLoading(true); 
    axios.post(`${baseUrl}/Task`, data, { headers: reqHeaders })
    .then(() => {
      getToastValue('success','Added Successfully')
      navigate('/dashboard/tasks')
    })
    .catch((error) => {
      getToastValue("error", error?.response?.data?.message)
    }) 
    .finally(() => {
      setIsLoading(false);
    });
  }
  
  {/* Get  Users*/ }
  const getUsers = useCallback(() => {
    axios.get(`${baseUrl}/Users/?groups=2&pageSize=20&pageNumber=3`, { headers: reqHeaders })
    .then((response) => {
      setUsers(response?.data?.data)
    }).catch((error) => {
      getToastValue('error', error?.response?.data?.message)
    })
  },[baseUrl,reqHeaders,getToastValue])

  {/* Get  All Projects*/ }
  const getAllProjects =useCallback( () => {
    axios.get(`${baseUrl}/Project/?pageSize=20&pageNumber=1`, { headers: reqHeaders })
    .then((response) => {
      setAllProjects(response?.data?.data);
    })
    .catch((error) => {
      getToastValue('error', error?.response?.data?.message);
    })
  },[baseUrl,reqHeaders,getToastValue])




  useEffect(() => {
    getUsers();
    getAllProjects();
   
  }, [getUsers,getAllProjects])
  return (
    <>
      <form onSubmit={handleSubmit(AddTask)} aria-label="Add Task Form">
        <div className="container bg-white addHead ">
          <div className="col-md-12">
            <div>
              <h5 className="p-3 m-auto" onClick={() => navigate(-1)}  aria-label="Go back to view All Tasks">
                <i className="fa-solid fa-chevron-left pe-2"> </i>
                view All Tasks
              </h5>
              <h3 > New Task</h3>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-md-8  m-auto bg-white mt-4  p-2 rounded-3">
            <div className="inputs m-auto ">
              <label className='d-block fw-bolder ' htmlFor="title">Title</label>
              <input type="text" id='title' placeholder='Name' className='form-control  border-2 rounded-2 '
                {...register('title', { required: true })}
              />
              {errors.title && errors.title.type === 'required' && (<span className='text-danger'> Title is required </span>)}
            </div>
            <div className='w-100 p-3 m-auto text'>
              <label className='d-block fw-bolder'htmlFor="description" >Description</label>
              <textarea  id="description" className='form-control  border-2 rounded-2' cols={20} rows={4}   {...register("description", { required: true })} placeholder='Description' >
              </textarea>
              {errors.description && errors.description.type === 'required' && (<span className='text-danger'> description is required </span>)}
            </div>
            <div className="selectors d-flex w-75 m-auto ">
              {/* {User Selector} */}
              <select className='form-select me-5'    {...register('employeeId', { required: true })} aria-label="Select User">
                {users.map((user, index) => (<option value={user?.id} key={index}>{user?.userName}</option>))}
              </select>
              {errors.employeeId && errors.employeeId.type === 'required' && (<span className='text-danger'> Field is required </span>)}
              {/* {Project Selector} */}
              <select className='form-select '     {...register('projectId', { required: true })} aria-label="Select Project">
                {allProjects.map((project, index) => (<option value={project?.id} key={index} >{project.title}</option>))}
              </select>
              {errors.projectId && errors.projectId.type === 'required' && (<span className='text-danger'> Field is required </span>)}
            </div>
            <hr className='' />
            <div className="btns d-flex justify-content-between">
              <button onClick={() => navigate(-1)} type='button' className={`${styles['hover-effect']} ms-5 rounded-5 border-black bg-white border-1 px-3 text-muted `}   aria-label="Cancel">cancel</button>
              <button type='submit' className='me-5 btn btn-warning text-white bg-warning rounded-5 px-4 hover-effect'aria-label="Save" disabled={isLoading}>     {isLoading ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      </form>

    </>


  )
}
