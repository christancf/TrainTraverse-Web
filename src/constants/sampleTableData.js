export const employeeTableHeadings = [
  { id: 1, name: 'ID' },
  { id: 2, name: 'Name' },
  { id: 3, name: 'Role' },
  { id: 4, name: 'Actions' },
]

export const employeeTableData = [
  {
    id: 'EMP0001',
    username: 'Christan Chandra',
    role: 'Back Office Officer',
    actions: true,
  },
  {
    id: 'EMP0002',
    username: 'Senal Weerasekara',
    role: 'Travel Agent',
    actions: true,
  },
]

export const trainTableHeadings = [
  { id: 1, name: 'ID' },
  { id: 2, name: 'Train Name' },
  { id: 3, name: 'Departure Station' },
  { id: 4, name: 'Arrival Station' },
  { id: 5, name: 'Departure Time' },
  { id: 6, name: 'Arrival Time' },
  { id: 7, name: 'Status' },
  { id: 8, name: 'Actions' },
]

export const trainTableData = [
  {
    trainId: 'TRN001',
    trainName: 'Udarata Manike',
    departureStation: 'Colombo',
    arrivalStation: 'Kandy',
    departureTime: '23-10-2023 12:00 PM',
    arrivalTime: '23-10-2023 04:00 PM',
    status: 'Active',
    actions: true,
  },
  {
    trainId: 'TRN002',
    trainName: 'Yaal Devi',
    departureStation: 'Jaffna',
    arrivalStation: 'Galle',
    departureTime: '23-10-2023 05:00 AM',
    arrivalTime: '23-10-2023 04:00 PM',
    status: 'Inactive',
    actions: true,
  },
]

export const bookingTableHeadings = [
  { id: 1, name: '# Reference No' },
  { id: 2, name: 'Traveller name' },
  { id: 3, name: 'Train name' },
  { id: 4, name: 'Status' },
  { id: 5, name: 'Booking date' },
  { id: 6, name: 'Reserved date ' },
  { id: 7, name: 'Actions' },
]

export const travellerTableHeadings = [
  { id: 1, name: 'Traveller NIC' },
  { id: 2, name: 'Traveller Name' },
  { id: 3, name: 'Email' },
  { id: 4, name: 'Phone Number' },
  { id: 5, name: 'Status' },
]
