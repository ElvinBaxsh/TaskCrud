import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetUsers } from "../Api/requests";
import { ROUTER } from "../constant/router";

const Home = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await GetUsers();
    setUsers(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-white my-3">User List</h1>

        <table className="table table-striped w-75 fs-4">
          <thead>
            <tr>
              <th>S.No</th>
              <th>FullName</th>
              <th>Age</th>
              <th>Email</th>
              <th>Position</th>
              <th>Update</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.fullName}</td>
                <td>{user.age}</td>
                <td>{user.email}</td>
                <td>{user.position}</td>
                <td>
                  <button className="btn btn-primary me-2">Modal</button>
                  <Link className="btn btn-primary" to={`${ROUTER.UpdateUser}/${user.id}`}>Page</Link>
                </td>
                <td>
                  <button className="btn btn-danger me-2">Delete</button>
                  <Link className="btn btn-info text-white">Info</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
