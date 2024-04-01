import CommonTable from "../components/CommonTable";
import {
  employeeTableHeadings,
} from "../constants/sampleTableData";
import ManageUserModal from "../components/modals/ManageUserModal";
import { sampleExistingUserData } from "../constants/sampleModalData";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosHelper";


const EmployeeManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState('');
  const [employeeTableData, setEmployeeTableData] = useState('');


  useEffect(()=>{
    if(userData){
      setOpenModal(true);
      console.log(userData)
    }

    axiosInstance
      .get("/users/all")
      .then((response) => {
        // console.log(JSON.stringify(response.data.result));
        setEmployeeTableData(response.data.result);
      })
      .catch((error) => {
        alert("Something went wrong!");
        console.log(error);
      });


  },[userData])

  function handleClick(){
    setUserData('')
    setOpenModal(true)
  }

  return (
    <>
      <Button onClick={handleClick} color="primary" size="lg">
        Add Employee
      </Button>
      {openModal && (
        <ManageUserModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          existinguserData={userData}
        />
      )}
      <CommonTable
        tableHeadings={employeeTableHeadings}
        tableData={employeeTableData}
        onClick={setUserData}
      />
    </>
  );
};

export default EmployeeManagement;
