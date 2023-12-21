import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import noData from '../../assets/noData.png';


export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const { baseUrl,reqHeaders,role }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToNew = () => {
    navigate("/dashboard/add-task");
  };

  let getTasksList = () => {
    axios
      .get(`${baseUrl}/Task/manager`,{ headers: reqHeaders })
      .then((response: any) => {
        setTasks(response?.data);
      })
      .catch((_: any) => {
      
      });
  };

  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <>
      <div className="header d-flex justify-content-between p-3">
        <h3>Tasks</h3>
        {role=="manager"? <button onClick={navigateToNew} className="btn btn-warning rounded-5">
          <i className="fa fa-plus" aria-hidden="true"></i> Add new task
        </button>:""}
       
      </div>

      <div className="table-container p-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Description</th>
              <th scope="col">User</th>
              <th scope="col">Project</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task: any) => (
                <tr key={task?.id}>
                  <th scope="row">{task?.title}</th>
                  <td key={task?.status}></td>
                  <td>{task?.description}</td>
                  <td>{task?.employee.userName}</td>
                  <td>{task?.project.title}</td>
                  <td></td>
                </tr>
              ))
            ) : (
              <div className="text-center"><img src={noData} alt="notfound" /></div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
