import axios from '../utils/axiosHelper'

// travellerNic, reservationDate, referenceId, id, status, train.name, train.departureStation
export const getBookings = async () => {
  try {
    const bookings = await axios.get('/booking/all')
    const bookingsData = bookings.data.result.map(booking => ({
      travellerNic: booking.travellerNic,
      reservationDate: booking.reservationDate,
      referenceId: booking.referenceId ?? booking.id,
      status: booking.status,
      trainName: booking.train.name,
      departureStation: booking.train.departureStation,
    }))
    return bookingsData
  } catch (error) {
    return null
  }
}

// travellerNic, reservationDate, trainId
export const addBooking = async booking => {
  try {
    await axios.post('/booking', booking)
    return { message: 'Booking added successfully!' }
  } catch (error) {
    return { message: 'There was an error! Try again later.' }
  }
}

export const editBooking = async booking => {
  try {
    await axios.patch(`/booking/${booking.id}`, booking)
    return { message: 'Booking updated successfully!' }
  } catch (error) {
    return { message: 'There was an error! Try again later.' }
  }
}

export const cancelBooking = async (nic, bookingID) => {
  try {
    await axios.post(`/traveller/${nic}/bookings/${bookingID}/cancel`)
    return { message: 'Booking cancelled successfully!' }
  } catch (error) {
    return { message: 'There was an error! Try again later.' }
  }
}
