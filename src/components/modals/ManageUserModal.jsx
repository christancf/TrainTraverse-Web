import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
  getFieldColor,
  handleChange,
  handleInput,
} from "../../utils/modalHelper";
import axiosInstance from "../../utils/axiosHelper";
import PasswordVisibility from "../PasswordVisibility";
import { useNavigate } from "react-router-dom";

const ManageUserModal = ({ openModal, setOpenModal, existinguserData }) => {
  const navigate = useNavigate();
  const [userData, setuserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "back_officer",
    password: "",
    username: "",
  });
  const [userError, setuserError] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const hasValidationErrorRef = useRef(false);

  useEffect(() => {
    if (existinguserData) {
      setuserData({
        id: existinguserData.id,
        firstName: existinguserData?.firstName,
        lastName: existinguserData?.lastName,
        email: existinguserData?.email,
        role: existinguserData?.role,
        username: existinguserData?.username,
      });
    }
    console.log("existing data set: ", userData);
  }, [existinguserData]);

  //resets form when modal is closed
  useEffect(() => {
    if (!openModal) {
      setuserData({
        firstName: "",
        lastName: "",
        email: "",
        role: "back_officer",
        username: "",
      });
      setuserError({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        username: "",
      });
    }
  }, [openModal]);

  //handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("This is bnew role s" + userData.role)
    if (!existinguserData) {
      axiosInstance
        .post("/users", {
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          role: userData.role,
        })
        .then((response) => {
          console.log("user added");
          alert("User Added!");
          setLoading(false);
          navigate(0);
        })
        .catch((error) => {
          setLoading(false);
          // alert("Something went wrong!");
          console.log(error);
        });

      console.log("submitted: ", userData);
      setOpenModal(false);
    } else {
      axiosInstance
        .patch(`/users/${userData.id}`, {
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role,
        })
        .then((response) => {
          console.log("user Modified");
          console.log("user added");
          alert("User Updated!");
          setLoading(false);
          navigate(0);
        })
        .catch((error) => {
          setLoading(false);
          // alert("Something went wrong!");
          console.log(error);
        });

      console.log("submitted: ", userData);
      setOpenModal(false);
    }
  };

  const handleSelectChange = (e, setuserData) => {
    const newRole = e.target.value;
    setuserData((prevUserData) => ({
      ...prevUserData,
      role: newRole,
    }));
  };
  

  return (
    <Modal
      show={openModal}
      size="2xl"
      popup
      onClose={() => setOpenModal(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            {existinguserData ? "Edit User" : "Add User"}
          </h3>
          <hr />
          <form onSubmit={(e) => handleSubmit(e, hasValidationErrorRef)}>
            <div>
              <div className="mt-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                name="username"
                type="text"
                value={userData.username}
                onChange={(e) => handleChange(e, setuserData)}
                onInput={() => handleInput(userError, setuserError)}
                helperText={userError.username}
                color={getFieldColor(userError.username)}
              />
            </div>
            <div>
              <div className="mt-2 block">
                <Label htmlFor="firstName" value="First Name" />
              </div>
              <TextInput
                id="firstName"
                name="firstName"
                type="text"
                value={userData.firstName}
                onChange={(e) => handleChange(e, setuserData)}
                onInput={() => handleInput(userError, setuserError)}
                helperText={userError.firstName}
                color={getFieldColor(userError.firstName)}
              />
            </div>
            <div>
              <div className="mt-2 block">
                <Label htmlFor="lastName" value="Last Name" />
              </div>
              <TextInput
                id="lastName"
                name="lastName"
                type="text"
                value={userData.lastName}
                onChange={(e) => handleChange(e, setuserData)}
                onInput={() => handleInput(userError, setuserError)}
                helperText={userError.lastName}
                color={getFieldColor(userError.lastName)}
              />
            </div>
            <div>
              <div className="mt-2 block">
                <Label htmlFor="role" value="Role" />
              </div>
              <select
                id="role"
                name="role"
                // value={userData.role}
                onChange={(e) => handleSelectChange(e, setuserData)}
                style={{ borderColor: getFieldColor(userError.role) }}
                color={getFieldColor(userError.role)}
              >
                <option value="back_officer">Back Officer</option>
                <option value="travel_agent">Travel Agent</option>
              </select>
            </div>
            <div>
              <div className="mt-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                name="email"
                type="text"
                value={userData.email}
                onChange={(e) => handleChange(e, setuserData)}
                onInput={() => handleInput(userError, setuserError)}
                helperText={userError.email}
                color={getFieldColor(userError.email)}
              />
            </div>
            {!existinguserData && (
              <div className="relative">
                <div className="mt-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={userData.password}
                  onChange={(e) => handleChange(e, setuserData)}
                  onInput={() => handleInput(userError, setuserError)}
                  helperText={userError.password}
                  color={getFieldColor(userError.password)}
                />
                <PasswordVisibility
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
            )}
            <div className="my-4 w-full">
              <Button type="submit" color="primary" className="w-full">
                {existinguserData ? "Save" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ManageUserModal;
