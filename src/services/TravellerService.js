import axios from '../utils/axiosHelper'

// nic, firstName, lastName, email, phoneNumber, disabled
export const getTravellers = async () => {
  try {
    const travellers = await axios.get('/traveller/all')
    const travellerData = travellers.data.result.map(traveller => ({
      fullName: [traveller.firstName, traveller.lastName].join(' '),
      nic: traveller.nic,
      email: traveller.email,
      phoneNumber: traveller.phoneNumber,
      status: traveller.disabled ? 'Inactive' : 'Active',
    }))
    return travellerData
  } catch (error) {
    return null
  }
}

export const getTravellerById = async id => {
  try {
    const traveller = await axios.get(`/traveller/${id}`)
    const travellerData = {
      fullName:
        traveller.data.result.firstName + ' ' + traveller.data.result.lastName,
      nic: traveller.data.result.nic,
      email: traveller.data.result.email,
      phoneNumber: traveller.data.result.phoneNumber,
      status: traveller.data.result.disabled ? 'Inactive' : 'Active',
    }
    return travellerData
  } catch (error) {
    return null
  }
}

// nic, password
export const addTraveller = async traveller => {
  try {
    console.log('getting to add : ', traveller)
    await axios.post('/traveller', formatTravellerObject(traveller))
    return { message: 'Traveller added successfully!' }
  } catch (error) {
    return { message: 'There was an error! Try again later.' + error }
  }
}

// firstName, lastName, email, phoneNumber
export const editTraveller = async traveller => {
  try {
    await axios.patch(
      `/traveller/${traveller.id}`,
      formatTravellerObject(traveller),
    )
    return { message: 'Traveller updated successfully!' }
  } catch (error) {
    return { message: 'There was an error! Try again later.' }
  }
}

export const changeTravellerStatus = async (nic, status) => {
  try {
    await axios.patch(`/traveller/${nic}/state`, { state: status })
    return { message: 'Traveller status updated successfully!' }
  } catch (error) {
    return { message: 'There was an error! Try again later.' }
  }
}

const formatTravellerObject = traveller => {
  traveller.username = traveller.email
  // console.log('name; ', traveller.firstName, traveller.lastName)
  // traveller.firstName = traveller.fullName?.split(' ')[0]
  // traveller.lastName = traveller.fullName?.split(' ')[1]
  delete traveller.fullName
  return traveller
}
