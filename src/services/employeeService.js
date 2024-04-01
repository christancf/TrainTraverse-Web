import axios from '../utils/axiosHelper'

export const getEmployees = async () => {
  try {
    const employees = await axios.get('/users/all')
    const employeesData = employees.data.result.map(employee => ({
      fullName: employee.firstName + ' ' + employee.lastName,
      username: employee.username,
      email: employee.email,
      status: employee?.disabled ? 'Inactive' : 'Active',
      role: employee.role,
    }))
    return employeesData
  } catch (error) {
    return null
  }
}

export const getEmployeeById = async id => {
  try {
    const employee = await axios.get(`/users/${id}`)
    const employeeData = {
      fullName:
        employee.data.result.firstName + ' ' + employee.data.result.lastName,
      username: employee.data.result.username,
      email: employee.data.result.email,
      status: employee.data.result.disabled ? 'Inactive' : 'Active',
      role: employee.data.result.role,
    }
    return employeeData
  } catch (error) {
    return null
  }
}

// userName, firstName, lastName, email, password, role
export const addEmployee = async employee => {
  try {
    employee.firstName = employee.fullName.split(' ')[0]
    employee.lastName = employee.fullName.split(' ')[1]
    delete employee.fullName
    await axios.post('/users', employee)
    return { message: 'Employee added successfully!' }
  } catch (error) {
    return { message: 'There was an error! Try again later.' }
  }
}

// userName, firstName, lastName
export const editEmployee = async employee => {
  try {
    employee.firstName = employee.fullName.split(' ')[0]
    employee.lastName = employee.fullName.split(' ')[1]
    delete employee.fullName
    await axios.patch(`/users/${employee.id}`, employee)
    return { message: 'Employee updated successfully!' }
  } catch (error) {
    return { message: 'There was an error! Try again later.' }
  }
}
