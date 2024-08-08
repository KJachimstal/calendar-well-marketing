import React, { useState } from 'react'

/* ------------------------------- Components ------------------------------- */
import Calendar from './Calendar'

import { appointments as appoint } from '../../appointments'
import { useGetAppointmentsQuery } from '../../redux/service/appointments'

/* -------------------------------------------------------------------------- */
/*                             Calendar Container                             */
/* -------------------------------------------------------------------------- */
const CalendarContainer = () => {
  const [selectedViewName, setSelectedViewName] = useState('Week')
  const [addedAppointment, setAddedAppointment] = useState({})
  const [appointmentChanges, setAppointmentChanges] = useState({})
  const [editingAppointment, setEditingAppointment] = useState({})
  const [appointments, setAppointments] = useState(appoint)
  const [currentDate, setCurrentDate] = useState("2018-07-25")
  const {data, error} = useGetAppointmentsQuery()

  const currentDateChange = (date) => {
    setCurrentDate(date)
  }

  const changeSelectedViewName = (viewName) => {
    setSelectedViewName(viewName)
  }

  const changeAddedAppointment = (data) => {
    console.log("Added - ", data)
    setAddedAppointment(data)
  }
  const changeAppointmentChanges = (data) => {
    console.log("Change - ", data)
    setAppointmentChanges(data)
  }
  const changeEditingAppointment = (data) => {
    console.log("Edit - ", data)
    setEditingAppointment(data)
  }

  const commitChanges = ({ added, changed, deleted }) => {
    console.log("commitChanges - ",added, changed, deleted)
    let newData = appointments
    if (added) {
      const startingAddedId = newData.length > 0 ? newData[newData.length - 1].id + 1 : 0;
      newData = [...newData, { id: startingAddedId, ...added }];
    }
    if (changed) {
      newData = newData.map(appointment => (
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
    }
    if (deleted !== undefined) {
      newData = newData.filter(appointment => appointment.id !== deleted);
    }

    setAppointments(newData);
  }

  /* --------------------------------- Render --------------------------------- */
  return (
    <Calendar {...{
      appointments,
      selectedViewName,
      addedAppointment,
      appointmentChanges,
      editingAppointment,
      currentDate,
      commitChanges,
      changeSelectedViewName,
      changeAddedAppointment,
      changeAppointmentChanges,
      changeEditingAppointment,
      currentDateChange,
    }}
    />
  )
}

export default CalendarContainer
