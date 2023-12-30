import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { ToastContext } from '../../Context/ToastContext'

export default function AddProject() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  let { baseUrl, reqHeaders }: any = useContext(AuthContext)
  let { getToastValue } = useContext(ToastContext)
  const [users, setUsers] = useState([])
  const [allProjects, setAllProjects] = useState([])


  {/* Add  Task*/ }
  const AddTask = (data) => {
    axios.post(`${baseUrl}/Task`, data, { headers: reqHeaders }).then((response) => {
      console.log(response);

      navigate(-1)

    }).catch((error) => {

      getToastValue("error", error?.response?.data?.message)

    })

  }

  {/* Get  Users*/ }
  const Users = () => {
    axios.get(`${baseUrl}/Users/Manager?pageSize=10&pageNumber=1`, { headers: reqHeaders }).then((response) => {
      setUsers(response?.data?.data)

    }).catch((error) => {
      getToastValue('error', error?.response?.data?.message)

    })
  }

  {/* Get  All Projects*/ }
  const AllProjects = () => {
    axios.get(`${baseUrl}/Project/?pageSize=20&pageNumber=1`, { headers: reqHeaders }).then((response) => {
      setAllProjects(response.data.data);



    }).catch((error) => {
      getToastValue('error', error?.response?.data?.message);
    })
  }



  useEffect(() => {
    Users();
    AllProjects();
  }, [])
  return (
    <>
      <form onSubmit={handleSubmit(AddTask)} >
        <div className="container bg-white addHead pb-4">
          <div className="col-md-12">
            <div>
              <h5 className="p-3 m-auto" onClick={() => navigate(-1)}>
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
                {...register('title', { required: true })}
              />
              {errors.title && errors.title.type === 'required' && (<span className='text-danger'> Title is required </span>)}

            </div>
            <div className='w-100 p-3 m-auto text'>


              <label className='d-block fw-bolder' >Description</label>

              <textarea className='form-control  border-2 rounded-2' cols="20" rows="4"   {...register("description", { required: true })} >Description


              </textarea>
              {errors.description && errors.description.type === 'required' && (<span className='text-danger'> description is required </span>)}


            </div>
            <div className="selectors d-flex w-75 m-auto ">
              {/* {User Selector} */}
              <select className='form-select me-5'    {...register('employeeId', { required: true })}>
                {users.map((user, index) => (<option value={user?.id} key={index}>{user?.userName}</option>))}
              </select>
              {errors.employeeId && errors.employeeId.type === 'required' && (<span className='text-danger'> Field is required </span>)}
              {/* {Project Selector} */}
              <select className='form-select '     {...register('projectId', { required: true })}>
                {allProjects.map((project, index) => (<option value={project?.id} key={index} >{project.title}</option>))}
              </select>
              {errors.projectId && errors.projectId.type === 'required' && (<span className='text-danger'> Field is required </span>)}

            </div>


            <hr className='' />
            <div className="btns d-flex justify-content-between">
              <button onClick={() => navigate(-1)} type='button' className='ms-5 rounded-5 border-black bg-white border-1 px-3 text-muted'>cancel</button>
              <button type='submit' className='me-5 btn btn-warning text-white bg-warning rounded-5 px-4'>save</button>
            </div>

          </div>
        </div>
      </form>

    </>


  )
}
