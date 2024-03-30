import React from "react";
import { GetSingleUser, EditUser } from "../Api/requests";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTER } from "../constant/router";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const initialState = {
  fullName: "",
  age: 0,
  email: "",
  position: "",
};
const UpdateUser = () => {
  const [editedUser, setEditedUser] = useState(initialState);
  const { userId } = useParams();
  const navigate = useNavigate()

  const fetchUserById = async () => {
    const response = await GetSingleUser(userId);
    setEditedUser(response);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleEdituser = async () => {
    await EditUser(userId, editedUser);
    setEditedUser(initialState);
    toast.success("User Edited successfully", {
      autoClose: 1500,
    });
    setTimeout(() => {
      navigate(ROUTER.Home);
    }, 2000);
  };

  useEffect(() => {
    fetchUserById()
  },[])

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column ">
        <h1 className="text-white my-4">Edit User</h1>
        <div className="bg-dark-subtle w-50 text-center rounded  border border-primary">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={editedUser.fullName}
              onChange={handleInputChange}
              className="p-2 w-75 my-2 border border-primary rounded"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Position"
              name="position"
              value={editedUser.position}
              onChange={handleInputChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={editedUser.age}
              onChange={handleInputChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
          </div>

          <Button className="m-2 px-4" onClick={handleEdituser}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
