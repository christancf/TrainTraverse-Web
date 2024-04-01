import axios from '../utils/axiosHelper'

export const getTrains = async () => {
  try {
    const trains = await axios.get('/trains')
    const trainsData =
      trains?.data?.trains?.map(train => ({
        id: train.id,
        name: train.name,
        departureStation: train.departureStation,
        arrivalStation: train.arrivalStation,
        departureTime: train.departureTime,
        arrivalTime: train.arrivalTime,
        status: train.disabled ? 'Inactive' : 'Active',
        schedules: train.shedules,
      })) ?? []
    return trainsData
  } catch (error) {
    console.log('error', error)
    return null
  }
}

export const getTrain = async id => {
  try {
    const train = await axios.get(`/trains/${id}`)
    return train?.data
  } catch (error) {
    return null
  }
}

export const addTrain = async train => {
  try {
    await axios.post('/trains', train)
    return { success: true, message: 'Train added successfully!' }
  } catch (error) {
    return { success: false, message: 'There was an error! Try again later.' }
  }
}

export const editTrain = async train => {
  try {
    await axios.patch(`/trains/${train.id}`, train)
    return { success: true, message: 'Train updated successfully!' }
  } catch (error) {
    return { success: false, message: 'There was an error! Try again later.' }
  }
}
