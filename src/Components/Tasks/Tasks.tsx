import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
// import noData from './../../assets/images/no-data.png'
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const { baseUrl, requestHeaders }: any = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToNew = () => {
    navigate("/dashboard/add-task");
  };

  let getTasksList = () => {
    axios
      .get(`${baseUrl}/Task`, { headers: requestHeaders })
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
      <div className="header bg-info d-flex justify-content-between p-3">
        <h3>Tasks</h3>
        <button onClick={navigateToNew} className="btn btn-warning rounded-5">
          <i className="fa fa-plus" aria-hidden="true"></i> Add new task
        </button>
      </div>

      <div className="table-container p-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">User</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task: any) => (
                <tr key={task?.id}>
                  <th scope="row">{task?.title}</th>
                  <td>{task?.description}</td>
                  <td>nmsdnm</td>
                  <td></td>
                </tr>
              ))
            ) : (
              <div className="text-center">ff</div>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
