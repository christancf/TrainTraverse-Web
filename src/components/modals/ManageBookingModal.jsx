import { Button, Label, Modal, Select, TextInput, ToggleSwitch } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosHelper";

import {
  getFieldColor,
  handleChange,
  handleInput,
} from "../../utils/modalHelper";
import SelectInput from "../common/SelectInput";
import { formatDate } from "../../utils/dateUtils";

const ManageBookingModal = ({
  openModal,
  setOpenModal,
  existingBookingData,
}) => {
  const qc = useQueryClient();

  const [bookingData, setBookingData] = useState({
    referenceId: "",
    travellerNic2: "",
    trainName2: "",
    departureStation: "",
    arrivalStation: "",
    reservationDate: "",
    status: "processing",
    reservationDate: ""
  });

  let departureQuery = useQuery({ queryKey: ['trainDepartures'], queryFn: () => axiosInstance.get("/trains?availableOnly=true") });
  const availableDepartures = departureQuery?.data?.data?.trains?.map(t => {
    return { value: t.departureStation, label: t.departureStation }
  }) || [{ value: "", label: "Choose one" }];

  let arrivalQuery = useQuery({ queryKey: ['trainArrivals', bookingData.departureStation], queryFn: () => axiosInstance.get(`/trains?departure=${bookingData.departureStation}&availableOnly=true`) });
  const availableArrival = arrivalQuery?.data?.data?.trains?.map(t => {
    return { value: t.id, label: t.arrivalStation }
  }) || [{ value: "", label: "Choose one" }];

  const update = useMutation({
    mutationFn: (update) => {
      return axiosInstance.patch(`/booking/${existingBookingData.id}`, update)
    },
    onSuccess: () => {
      qc.invalidateQueries(['bookings']);
      setOpenModal(false);
    },
    onError: () => {
      alert(`Update failed for booking with id - ${existingBookingData.id}`)
    }
  })

  const create = useMutation({
    mutationFn: (update) => {
      return axiosInstance.post(`/booking`, update)
    },
    onSuccess: () => {
      qc.invalidateQueries(['bookings']);
      setOpenModal(false);
    },
    onError: (error) => {
      console.log(error, "Dfa5yy5y5y5");
      alert(`Booking failed. Too many bookings per train. only 5 allowed per traveler per train.`)
    }
  })

  const availableDates = [];

  arrivalQuery?.data?.data?.trains?.forEach(t => {
    Object.values(t.shedules || {}).forEach(tt => {
      availableDates.push({ value: t.id + "|" + tt.departureDate, label: formatDate(tt.departureDate) });
    })
  })

  console.log(availableDepartures, availableArrival, "Dfafdafdadfdfaf");
  const [bookingError, setBookingError] = useState({
    referenceId: "",
    travellerNic2: "",
    trainName2: "",
    departureStation: "",
    reservationDate: "",
    status: "",
    arrivalStation: "",
    reservationDate: ""
  });

  const hasValidationErrorRef = useRef(false);

  useEffect(() => {
    if (existingBookingData) {
      console.log(existingBookingData, "dfafdasf");

      setBookingData({
        referenceId: existingBookingData?.referenceId,
        travellerNic2: existingBookingData?.travellerNic,
        trainName2: existingBookingData?.trainName,
        departureStation: existingBookingData?.departureStation,
        reservationDate: existingBookingData?.reservationDate,
        status: existingBookingData?.status,
        arrivalStation: existingBookingData?.arrivalStation,
      });
    }
  }, [existingBookingData]);

  useEffect(() => {
    try {
      arrivalQuery.refetch();
    } catch (e) {
      console.error(e);
    }
  }, [bookingData.departureStation]);
  //resets form when modal is closed
  useEffect(() => {
    if (!openModal) {
      setBookingData({
        referenceId: "",
        travellerNic2: "",
        trainName2: "",
        departureStation: "",
        reservationDate: "",
        status: "processing",
      });
      setBookingError({
        referenceId: "",
        travellerNic: "",
        trainName2: "",
        departureStation: "",
        reservationDate: "",
        status: "",
      });
    }
  }, [openModal]);

  //handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (hasValidationErrorRef.current) return;

    console.log(bookingData)
    let r = bookingData.reservationDate.split("|");

    if (existingBookingData) {
      update.mutate({
        "trainId": r[0],
        "reservationDate": r[1],
        "status": "processing"
      });
    } else {
      create.mutate({
        "travellerNic": bookingData.travellerNic2,
        "reservationDate": r[1],
        "trainId": r[0]
      });
    }
    console.log("submitted: ", bookingData);
  };

  const handleCancelBooking = () => {
    console.log("booking cancelled");
    setOpenModal(false);
  };

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
            {existingBookingData ? "Edit Booking" : "Add Booking"}
          </h3>
          <hr />
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={existingBookingData ? "block" : "hidden"}>
              <div className="mt-2 block">
                <Label htmlFor="referenceId" value="Reference ID" />
              </div>
              <TextInput
                id="referenceId"
                name="referenceId"
                type="text"
                value={bookingData.referenceId}
                onChange={(e) => handleChange(e, setBookingData)}
                onInput={() => handleInput(bookingError, setBookingError)}
                helperText={bookingError.referenceId}
                color={getFieldColor(bookingError.referenceId)}
                disabled
              />
            </div>
            <div>
              <div className="mt-2 block">
                <Label htmlFor="travellerNic2" value="Traveller NIC" />
              </div>
              <TextInput
                id="travellerNic2"
                name="travellerNic2"
                type="text"
                value={bookingData.travellerNic2}
                onChange={(e) => handleChange(e, setBookingData)}
                onInput={() => handleInput(bookingError, setBookingError)}
                helperText={bookingError.travellerNic2}
                color={getFieldColor(bookingError.travellerNic2)}
                disabled={existingBookingData ? true : false}
              />
            </div>
            {existingBookingData ? <div>
              <div className="mt-2 block">
                <Label htmlFor="trainName2" value="Train Name" />
              </div>
              <TextInput
                id="trainName2"
                name="trainName2"
                type="text"
                value={bookingData.trainName2}
                onChange={(e) => handleChange(e, setBookingData)}
                onInput={() => handleInput(bookingError, setBookingError)}
                helperText={bookingError.trainName2}
                color={getFieldColor(bookingError.trainName2)}
                disabled
              />
            </div> : null}
            <div>
              <SelectInput
                id="departureStation"
                label="Departure Station"
                options={[{ value: "choose", label: "Choose one" }, ...availableDepartures]}
                value={bookingData.departureStation}
                onChange={(e) => {
                  handleChange(e, setBookingData)
                  console.log("change");
                }}
                overrideHidden
                onInput={() => handleInput(bookingError, setBookingError)}
                helperText={bookingError.departureStation}
                color={getFieldColor(bookingError.departureStation)}
              />
            </div>
            <div>
              <SelectInput
                id="arrivalStation"
                label="Arrival Station"
                options={[{ value: "choose", label: "Choose one" }, ...availableArrival]}
                value={bookingData.arrivalStation}
                onChange={(e) => {
                  handleChange(e, setBookingData)
                  console.log("change");
                }}
                overrideHidden
                onInput={() => handleInput(bookingError, setBookingError)}
                helperText={bookingError.arrivalStation}
                color={getFieldColor(bookingError.arrivalStation)}
              />
            </div>
            <div>
              <SelectInput
                id="reservationDate"
                label="Reservation Date"
                options={[{ value: "choose", label: "Choose one" }, ...availableDates]}
                value={bookingData.reservationDate}
                onChange={(e) => {
                  handleChange(e, setBookingData)
                  console.log("change");
                }}
                overrideHidden
                onInput={() => handleInput(bookingError, setBookingError)}
                helperText={bookingError.reservationDate}
                color={getFieldColor(bookingError.departureStation)}
              />
            </div>
            <div className="flex gap-4 my-4 w-full">
              <Button
                type="button"
                color="transparent"
                onClick={handleCancelBooking}
                className={`${existingBookingData ? "" : "hidden"
                  } w-full bg-red-700 text-white`}
              >
                Cancel Booking
              </Button>
              <Button type="submit" color="primary" className="w-full">
                {existingBookingData ? "Update Booking" : "Add Booking"}
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ManageBookingModal;
