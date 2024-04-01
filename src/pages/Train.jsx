import { Button, Tabs } from 'flowbite-react'
import { useEffect, useState } from 'react'
import ManageTrainModal from '../components/modals/ManageTrainModal'
import {
  CalendarIcon,
  HomeModernIcon,
  PresentationChartLineIcon,
} from '@heroicons/react/24/outline'
import CommonTable from '../components/CommonTable'
import {
  trainTableData,
  trainTableHeadings,
} from '../constants/sampleTableData'
import { getTrains } from '../services/TrainService'
import ToastMessage from '../components/common/ToastMessage'

const Train = () => {
  const [openAddTrainModal, setOpenAddTrainModal] = useState(false)
  const [openScheduleModal, setOpenScheduleModal] = useState(false)
  const [trainData, setTrainData] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [editModal, setEditModal] = useState({
    openModal: false,
    trainData: null,
  })
  const [toast, setToast] = useState({
    message: '',
    success: false,
  })

  useEffect(() => {
    async function retrieveTrains() {
      const trains = await getTrains()
      setTrainData(trains)
    }
    retrieveTrains()
  }, [])

  const handleShowToast = response => {
    setTimeout(() => {
      setShowToast(false)
    }, 5000)
    setToast(response)
    setShowToast(true)
  }

  const handleEditModal = dataItem => {
    setEditModal({
      trainData: dataItem,
      openModal: true,
    })
  }
  return (
    <div className="p-4 space-y-4">
      <div className="flex max-sm:flex-col max-sm:space-y-2 items-center justify-between">
        <div className="text-gray-900 text-3xl font-bold">Train Management</div>
        {/* add modal buttons */}
        <div className="flex space-x-4 items-center max-sm:justify-start justify-end">
          <Button
            color="secondary"
            size={'sm'}
            onClick={() => setOpenScheduleModal(true)}
          >
            Add Schedule
          </Button>
          <Button
            color="primary"
            size={'sm'}
            onClick={() => setOpenAddTrainModal(true)}
          >
            Add Train
          </Button>
        </div>
      </div>
      <CommonTable
        tableHeadings={trainTableHeadings}
        tableData={trainData ?? []}
        onClick={handleEditModal}
      />
      {openAddTrainModal && (
        <ManageTrainModal
          openModal={openAddTrainModal}
          setOpenModal={setOpenAddTrainModal}
          handleShowToast={handleShowToast}
        />
      )}
      {editModal.openModal && (
        <ManageTrainModal
          openModal={editModal.openModal}
          setOpenModal={setEditModal}
          handleShowToast={handleShowToast}
          existingTrainData={editModal.trainData}
        />
      )}
      <ToastMessage
        showToast={showToast}
        setShowToast={setShowToast}
        message={toast.message}
        success={toast.success}
      />
    </div>
  )
}

export default Train
