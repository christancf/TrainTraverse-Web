import axios from '../utils/axiosHelper'

// id, departureDate, availableSeats, totalSeats
export const getSchedulesByTrainId = async trainId => {
  try {
    const schedules = (await axios.get(`/trains/${trainId}/schedule`)).data
    return Object.values(schedules)
  } catch (error) {
    return null
  }
}

// departureDate, availableSeats, totalSeats
export const addScheduleByTrainId = async (trainId, schedule) => {
  try {
    await axios.post(`/trains/${trainId}/schedule`, schedule)
    return { message: 'Schedule added successfully!' }
  } catch (error) {
    return { message: 'There was an error! Try again later.' }
  }
}

// departureDate, availableSeats, totalSeats
export const editScheduleByTrainId = async (trainId, schedule) => {
  try {
    await axios.patch(`/trains/${trainId}/schedule/${schedule.id}`, schedule)
    return { message: 'Schedule updated successfully!' }
  } catch (error) {
    return { message: 'There was an error! Try again later.' }
  }
}
