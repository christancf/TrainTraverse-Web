import { Button, Table,} from "flowbite-react";
import {
  employeeTableHeadings,
} from "../constants/sampleTableData";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { PencilSquareIcon, XMarkIcon, CheckIcon  } from "@heroicons/react/24/outline";
import ManageUserModal from "../components/modals/ManageUserModal";

const AdminDashboard = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEmployeeData, setSelectEmployeeData] = useState();
  const [allEmployeeData, setAllEmployeeData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.eadbe.dev.dehemi.com/api/users/all');
        setAllEmployeeData(response.data.result);
        console.log(allEmployeeData);
      } catch (error) {
        console.error('Error fetching data:', error);
        
      }
    };
    fetchData();
  }, []); 

  const getStatusBadgeColor = (color) => {
    switch(color) {
      case "cancelled":
        return "red";
      case "processing":
        return "green";
      default:
        return "blue";
    }
  } 

  const onClickEdit = (user) => {
    setSelectEmployeeData(user);
    setOpenEditModal(true)
  }


  return (
    <>
      {openAddModal && (
          <ManageUserModal
            openModal={openAddModal}
            setOpenModal={setOpenAddModal}
          />
        )}
        {openEditModal && (
          <ManageUserModal
            openModal={openEditModal}
            setOpenModal={setOpenEditModal}
            existinguserData={selectedEmployeeData}
          />
        )}
    
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-gray-900 font-bold text-3xl">Admin Dashboard</div>
          <Button size="sm" color="primary" onClick={() => setOpenAddModal(true)}>
            Add Employees
          </Button>
        </div>
        {/* tabs content */}
        {/* <Tabs.Group style="underline" className="w-full">
          <Tabs.Item active icon={ShieldCheckIcon} title="Admin">
            <CommonTable
              tableHeadings={employeeTableHeadings}
              tableData={allEmployeeData}
            />
          </Tabs.Item>
          <Tabs.Item icon={BuildingOfficeIcon} title="Backoffice">
            <CommonTable
              tableHeadings={employeeTableHeadings}
              tableData={employeeTableData}
            />
          </Tabs.Item>
          <Tabs.Item icon={GlobeAmericasIcon} title="Travel Agent">
            <CommonTable
              tableHeadings={employeeTableHeadings}
              tableData={employeeTableData}
            />
          </Tabs.Item>
        </Tabs.Group> */}
        <div>
        <Table hoverable>
          <Table.Head>
            {employeeTableHeadings.map((heading) => (
              <Table.HeadCell key={heading.id}>{heading.name}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
              {allEmployeeData? allEmployeeData.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell key={1}>{user.id}</Table.Cell>
                  <Table.Cell key={2}>{user.firstName}</Table.Cell>
                  <Table.Cell key={3}>{user.role}</Table.Cell>
                  <Table.Cell key={7}>
                    <div className="flex flex-row">
                      <PencilSquareIcon
                        className="h-5 w-5 text-amber-500 ml-4 cursor-pointer"
                        onClick={() => onClickEdit(user)}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              )
          ) : ""}
          </Table.Body>
        </Table>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
