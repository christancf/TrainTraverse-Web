import { Button, Label, Modal, TextInput, ToggleSwitch } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import PasswordVisibility from '../PasswordVisibility'
import {
  getFieldColor,
  handleChange,
  handleInput,
  handleToggleChange,
  handleValidation,
} from '../../utils/modalHelper'
import { addTraveller, editTraveller } from '../../services/TravellerService'

const ManageTravellerModal = ({
  openModal,
  setOpenModal,
  existingTravellersData,
}) => {
  const [travellersData, setTravellersData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    nic: '',
    contactNumber: '',
    isActive: true,
  })
  const [travellersError, setTravellersError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    nic: '',
    contactNumber: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const hasValidationErrorRef = useRef(false)

  // set existing traveller data
  useEffect(() => {
    if (existingTravellersData) {
      setTravellersData({
        firstName: existingTravellersData?.firstName,
        lastName: existingTravellersData?.lastName,
        email: existingTravellersData?.email,
        nic: existingTravellersData?.nic,
        phoneNumber: existingTravellersData?.contactNumber,
        disabled: existingTravellersData?.isActive,
      })
    }
  }, [existingTravellersData])
  console.log('exisnting data: ', travellersData)
  //resets form when modal is closed
  useEffect(() => {
    if (!openModal) {
      setTravellersData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        nic: '',
        phoneNumber: '',
        isActive: true,
      })
      setTravellersError({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        nic: '',
        phoneNumber: '',
      })
    }
  }, [openModal])

  //handle form submission
  const handleSubmit = event => {
    console.log('event handle submit: ', event)
    event.preventDefault()
    handleValidation(hasValidationErrorRef, travellersData, setTravellersError)
    console.log('has validation: ', hasValidationErrorRef.current)

    // if (hasValidationErrorRef.current) return
    if (existingTravellersData) {
      editTraveller(travellersData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } else {
      addTraveller(travellersData)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    window.location.reload()
    console.log('submitted: ', travellersData)
    setOpenModal(false)
  }

  return (
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
            {existingTravellersData ? 'Edit Traveller' : 'Add Traveller'}
          </h3>
          <hr />
          <form onSubmit={e => handleSubmit(e, hasValidationErrorRef)}>
            <div>
              <div className="mt-2 block">
                <Label htmlFor="firstName" value="First Name" />
              </div>
              <TextInput
                id="firstName"
                name="firstName"
                type="text"
                value={travellersData.firstName}
                onChange={e => handleChange(e, setTravellersData)}
                onInput={() => handleInput(travellersError, setTravellersError)}
                helperText={travellersError.firstName}
                color={getFieldColor(travellersError.firstName)}
              />
            </div>
            <div>
              <div className="mt-2 block">
                <Label htmlFor="lastName" value="Last Name" />
              </div>
              <TextInput
                id="lastName"
                name="lastName"
                type="text"
                value={travellersData.lastName}
                onChange={e => handleChange(e, setTravellersData)}
                onInput={() => handleInput(travellersError, setTravellersError)}
                helperText={travellersError.lastName}
                color={getFieldColor(travellersError.lastName)}
              />
            </div>
            <div>
              <div className="mt-2 block">
                <Label htmlFor="nic" value="NIC" />
              </div>
              <TextInput
                id="nic"
                name="nic"
                type="text"
                value={travellersData.nic}
                onChange={e => handleChange(e, setTravellersData)}
                onInput={() => handleInput(travellersError, setTravellersError)}
                helperText={travellersError.nic}
                color={getFieldColor(travellersError.nic)}
              />
            </div>
            <div>
              <div className="mt-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                name="email"
                type="text"
                value={travellersData.email}
                onChange={e => handleChange(e, setTravellersData)}
                onInput={() => handleInput(travellersError, setTravellersError)}
                helperText={travellersError.email}
                color={getFieldColor(travellersError.email)}
              />
            </div>
            {!existingTravellersData && (
              <div className="relative">
                <div className="mt-2 block">
                  <Label htmlFor="password" value="Password" />
                </div>
                <TextInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={travellersData.password}
                  onChange={e => handleChange(e, setTravellersData)}
                  onInput={() =>
                    handleInput(travellersError, setTravellersError)
                  }
                  helperText={travellersError.password}
                  color={getFieldColor(travellersError.password)}
                />
                <PasswordVisibility
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </div>
            )}
            <div>
              <div className="mt-2 block">
                <Label htmlFor="phoneNumber" value="Contact Number" />
              </div>
              <TextInput
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                value={travellersData.phoneNumber}
                onChange={e => handleChange(e, setTravellersData)}
                onInput={() => handleInput(travellersError, setTravellersError)}
                helperText={travellersError.phoneNumber}
                color={getFieldColor(travellersError.phoneNumber)}
              />
            </div>
            <div>
              <div className="my-2 block">
                <Label htmlFor="status" value="Status" />
              </div>
              <ToggleSwitch
                id="isActive"
                name="isActive"
                checked={travellersData.isActive}
                label={travellersData.isActive ? 'Active' : 'Inactive'}
                onChange={e => handleToggleChange(e, setTravellersData)}
                color="primary"
              />
            </div>
            <div className="my-4 w-full">
              <Button type="submit" color="primary" className="w-full">
                {existingTravellersData ? 'Save' : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ManageTravellerModal
