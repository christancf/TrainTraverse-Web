import { useEffect, useRef, useState } from 'react'
import {
  getFieldColor,
  handleChange,
  handleInput,
  handleToggleChange,
  handleValidation,
} from '../../utils/modalHelper'
import { Button, Label, Modal, TextInput, ToggleSwitch } from 'flowbite-react'
import { addTrain, editTrain } from '../../services/TrainService'

const ManageTrainModal = ({
  openModal,
  setOpenModal,
  existingTrainData,
  handleShowToast,
}) => {
  const [trainData, setTrainData] = useState({
    id: '',
    name: '',
    departureStation: '',
    arrivalStation: '',
    departureTime: '',
    arrivalTime: '',
    isActive: true,
  })
  const [trainError, setTrainError] = useState({
    id: '',
    name: '',
    departureStation: '',
    arrivalStation: '',
    departureTime: '',
    arrivalTime: '',
    isActive: true,
  })
  const hasValidationErrorRef = useRef(false)

  // set existing train data
  useEffect(() => {
    if (existingTrainData) {
      setTrainData({
        id: existingTrainData?.trainId,
        name: existingTrainData?.trainName,
        departureStation: existingTrainData?.departureStation,
        arrivalStation: existingTrainData?.arrivalStation,
        departureTime: existingTrainData?.departureTime,
        arrivalTime: existingTrainData?.arrivalTime,
        isActive: existingTrainData?.isActive,
      })
    }
  }, [existingTrainData])

  // handle modal close
  const handleModalClose = () => {
    setTrainData({
      id: '',
      name: '',
      departureStation: '',
      arrivalStation: '',
      departureTime: '',
      arrivalTime: '',
      isActive: true,
    })
    setTrainError({
      id: '',
      name: '',
      departureStation: '',
      arrivalStation: '',
      departureTime: '',
      arrivalTime: '',
      isActive: true,
    })
    setOpenModal(false)
  }

  // handle train form submission
  const handleSubmit = async event => {
    event.preventDefault()
    handleValidation(hasValidationErrorRef, trainData, setTrainError)
    if (hasValidationErrorRef.current) return
    let response
    delete trainData.id
    console.log('existingTrainData', existingTrainData)
    if (existingTrainData) {
      response = await editTrain(trainData)
    } else {
      response = await addTrain(trainData)
    }
    handleShowToast(response)
    handleModalClose()
  }
  return (
    <>
      <Modal
        show={openModal}
        size="2xl"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {existingTrainData ? 'Edit Train' : 'Add Train'}
            </h3>
            <hr />
            <form onSubmit={e => handleSubmit(e, hasValidationErrorRef)}>
              <div className={existingTrainData ? 'block' : 'hidden'}>
                <div className="mt-2 block">
                  <Label htmlFor="trainId" value="Train ID" />
                </div>
                <TextInput
                  id="trainId"
                  name="id"
                  type="text"
                  value={trainData.id}
                  onChange={e => handleChange(e, setTrainData)}
                  onInput={() => handleInput(trainError, setTrainError)}
                  helperText={trainError.id}
                  disabled
                  color={getFieldColor(trainError.id)}
                />
              </div>
              <div>
                <div className="mt-2 block">
                  <Label htmlFor="trainName" value="Train Name" />
                </div>
                <TextInput
                  id="trainName"
                  name="name"
                  type="text"
                  value={trainData.name}
                  onChange={e => handleChange(e, setTrainData)}
                  onInput={() => handleInput(trainError, setTrainError)}
                  helperText={trainError.name}
                  color={getFieldColor(trainError.name)}
                />
              </div>
              <div>
                <div className="mt-2 block">
                  <Label htmlFor="departureStation" value="Departure Station" />
                </div>
                <TextInput
                  id="departureStation"
                  name="departureStation"
                  type="text"
                  value={trainData.departureStation}
                  onChange={e => handleChange(e, setTrainData)}
                  onInput={() => handleInput(trainError, setTrainError)}
                  helperText={trainError.departureStation}
                  color={getFieldColor(trainError.departureStation)}
                />
              </div>
              <div>
                <div className="mt-2 block">
                  <Label htmlFor="arrivalStation" value="Arrival Station" />
                </div>
                <TextInput
                  id="arrivalStation"
                  name="arrivalStation"
                  type="text"
                  value={trainData.arrivalStation}
                  onChange={e => handleChange(e, setTrainData)}
                  onInput={() => handleInput(trainError, setTrainError)}
                  helperText={trainError.arrivalStation}
                  color={getFieldColor(trainError.arrivalStation)}
                />
              </div>
              <div>
                <div className="mt-2 block">
                  <Label htmlFor="departureTime" value="Departure Time" />
                </div>
                <TextInput
                  id="departureTime"
                  name="departureTime"
                  type="text"
                  value={trainData.departureTime}
                  onChange={e => handleChange(e, setTrainData)}
                  onInput={() => handleInput(trainError, setTrainError)}
                  helperText={trainError.departureTime}
                  color={getFieldColor(trainError.departureTime)}
                />
              </div>
              <div>
                <div className="mt-2 block">
                  <Label htmlFor="arrivalTime" value="Arrival Time" />
                </div>
                <TextInput
                  id="arrivalTime"
                  name="arrivalTime"
                  type="text"
                  value={trainData.arrivalTime}
                  onChange={e => handleChange(e, setTrainData)}
                  onInput={() => handleInput(trainError, setTrainError)}
                  helperText={trainError.arrivalTime}
                  color={getFieldColor(trainError.arrivalTime)}
                />
              </div>
              <div>
                <div className="my-2 block">
                  <Label htmlFor="status" value="Status" />
                </div>
                <ToggleSwitch
                  id="isActive"
                  name="isActive"
                  checked={!trainData.isActive}
                  label={trainData.isActive ? 'Inactive' : 'Active'}
                  onChange={e => handleToggleChange(e, setTrainData)}
                  color="primary"
                />
              </div>
              <div className="flex space-x-4 my-4 w-full">
                <Button
                  onClick={handleModalClose}
                  color="failure"
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" className="w-full">
                  {existingTrainData ? 'Save' : 'Submit'}
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ManageTrainModal
