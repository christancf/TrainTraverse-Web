import { useState } from "react";
import { Button, Table, Badge } from "flowbite-react";
import { sampleExistingBookingData } from "../constants/sampleModalData";
import ManageBookingModal from "../components/modals/ManageBookingModal";
import SelectInput from "../components/common/SelectInput";
import CommonTable from "../components/CommonTable";
import { bookingTableHeadings } from "../constants/sampleTableData";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utils/axiosHelper"
import { formatDate } from "../utils/dateUtils";
import { PencilSquareIcon, XMarkIcon, CheckIcon  } from "@heroicons/react/24/outline";

const Booking = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBookingData, setSelectedBookingData] = useState();

  const allBookings = useQuery({ queryKey: ['bookings'], queryFn: () => axiosInstance.get("/booking/all") });
  const allBookingData = allBookings?.data?.data?.result || [];

  const doneMutation = useMutation({
    mutationFn: (update) => {
      return axiosInstance.post(`/booking/${update.id}/done`)
    },
    onSuccess: () => {
      qc.invalidateQueries(['bookings']);
      setOpenModal(false);
    },
    onError: () => {
      alert(`Update failed for booking`)
    }
  });

  const getStatusBadgeColor = (color) => {
    switch(color) {
      case "cancelled":
        return "red";
      case "processing":
        return "green";
      default:
        return "blue";
    }
  } 

  const onClickEdit = (booking) => {
    booking.trainName = booking?.train?.name;
    booking.departureStation = booking?.train.departureStation;
    
    setSelectedBookingData(booking);
    setOpenEditModal(true)
  }

  return (
    <>
      {openAddModal && (
        <ManageBookingModal
          openModal={openAddModal}
          setOpenModal={setOpenAddModal}
        />
      )}
      {openEditModal && (
        <ManageBookingModal
          openModal={openEditModal}
          setOpenModal={setOpenEditModal}
          existingBookingData={selectedBookingData}
        />
      )}
      <div className="p-4 space-y-4">
      <div className="flex max-sm:flex-col max-sm:space-y-2 items-center justify-between">
        <div className="text-gray-900 text-3xl font-bold">Reservations Management</div>
        {/* add modal buttons */}
        <div className="flex space-x-4 items-center max-sm:justify-start justify-end">
          <Button
            color="secondary"
            size={"sm"}
            onClick={() => setOpenAddModal(true)} 
          >
            Add Booking
          </Button>
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          {bookingTableHeadings.map((heading) => (
            <Table.HeadCell key={heading.id}>{heading.name}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
            {allBookingData.map((booking) => (
              <Table.Row key={booking.id}>
                <Table.Cell key={1}>{booking.referenceId}</Table.Cell>
                <Table.Cell key={2}>{booking.id}</Table.Cell>
                <Table.Cell key={3}>{booking.train.name}</Table.Cell>
                <Table.Cell key={4}>
                <Badge
                  color={getStatusBadgeColor(booking.status)}
                  size="sm"
                  className="w-max rounded-lg cursor-pointer"
                >
                  {booking.status}
                </Badge>
                </Table.Cell>
                <Table.Cell key={5}>{formatDate(booking.bookingDate, true)}</Table.Cell>
                <Table.Cell key={6}>{formatDate(booking.reservationDate)}</Table.Cell>
                <Table.Cell key={7}>
                  <div className="flex flex-row">
                    <PencilSquareIcon
                      className="h-5 w-5 text-amber-500 ml-4 cursor-pointer"
                      onClick={() => onClickEdit(booking)}
                    />
                    <XMarkIcon
                      className="h-5 w-5 text-red-500 ml-4 cursor-pointer"
                      onClick={() => onClickEdit(booking)}
                    />
                    <CheckIcon
                      className="h-5 w-5 text-green-500 ml-4 cursor-pointer"
                      onClick={() => {
                        doneMutation.mutateAsync().catch(console.error)
                      }}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            )
        )}
        </Table.Body>
      </Table>
      </div>
    </>
  );
};

export default Booking;
