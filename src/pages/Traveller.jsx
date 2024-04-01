import { useEffect, useState } from 'react'
import ManageTravellerModal from '../components/modals/ManageTravellerModal'
import { Badge, Button, Table } from 'flowbite-react'
import { travellerTableHeadings } from '../constants/sampleTableData'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { getTravellers } from '../services/TravellerService'

const Traveller = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [selectedTravellerData, setSelectedTravellerData] = useState()
  const [allTravellersData, setAllTravellersData] = useState([])

  useEffect(() => {
    async function retrieveData() {
      const travellers = await getTravellers()
      setAllTravellersData(travellers)
    }
    retrieveData()
  }, [])

  const onClickEdit = traveller => {
    setSelectedTravellerData(traveller)
    console.log('edit: ', traveller)
    setOpenEditModal(true)
  }

  const getStatusBadgeColor = status => {
    switch (status) {
      case 'Inactive':
        return 'failure'
      case 'Active':
        return 'success'
      default:
        return 'gray'
    }
  }

  console.log('all travellers data: ', allTravellersData)
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-gray-900 text-3xl font-bold">
          Traveller Management
        </div>
        <Button onClick={() => setOpenAddModal(true)} color="primary" size="sm">
          Add Traveller
        </Button>
      </div>
      <div className="overflow-x-scroll">
        <Table hoverable>
          <Table.Head className="whitespace-nowrap">
            {travellerTableHeadings.map(heading => (
              <Table.HeadCell key={heading.id}>{heading.name}</Table.HeadCell>
            ))}
            <Table.HeadCell>
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allTravellersData?.reverse().map(traveller => (
              <Table.Row key={traveller.nic}>
                <Table.Cell key={1}>{traveller.nic}</Table.Cell>
                <Table.Cell key={2}>{traveller.fullName}</Table.Cell>
                <Table.Cell key={3}>{traveller.email}</Table.Cell>
                <Table.Cell key={4}>{traveller.phoneNumber}</Table.Cell>
                <Table.Cell key={5}>
                  <Badge
                    color={getStatusBadgeColor(traveller.status)}
                    size="sm"
                    className="w-max rounded-lg cursor-pointer"
                  >
                    {traveller.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell key={6}>
                  <div className="flex flex-row">
                    <PencilSquareIcon
                      className="h-5 w-5 text-amber-500 ml-4 cursor-pointer"
                      onClick={() => onClickEdit(traveller)}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      {openAddModal && (
        <ManageTravellerModal
          openModal={openAddModal}
          setOpenModal={setOpenAddModal}
        />
      )}
      {/* <ToastMessage
        showToast={showToast}
        setShowToast={setShowToast}
        message={toast.message}
        success={toast.success}
      /> */}
      {openEditModal && (
        <ManageTravellerModal
          openModal={openEditModal}
          setOpenModal={setOpenEditModal}
          existingTravellersData={selectedTravellerData}
        />
      )}
    </div>
  )
}

export default Traveller
