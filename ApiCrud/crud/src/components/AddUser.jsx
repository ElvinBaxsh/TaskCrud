import { AddUsers } from "../Api/requests";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTER } from "../constant/router";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const initialState = {
  fullName: "",
  age: 0,
  email: "",
  position: "",
};

const AddUser = () => {
  const [newUser, setNewUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdduser = async () => {
    setLoading(true);
    await AddUsers(newUser);
    setNewUser(initialState);
    toast.success("User Added successfully", {
      autoClose: 1500,
    });
    setLoading(false);
    setTimeout(() => {
      navigate(ROUTER.Home);
    }, 2000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center flex-column ">
        <h1 className="text-white my-4">Add User</h1>
        <div className="bg-dark-subtle w-50 text-center rounded  border border-primary">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              value={newUser.fullName}
              onChange={handleInputChange}
              className="p-2 w-75 my-2 border border-primary rounded"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Position"
              name="position"
              value={newUser.position}
              onChange={handleInputChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={newUser.age}
              onChange={handleInputChange}
              className="p-2 w-75 my-1 border border-primary rounded"
            />
          </div>

          <Button className="my-3 px-5 py-2 fs-5" onClick={handleAdduser}>
            {loading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddUser;
