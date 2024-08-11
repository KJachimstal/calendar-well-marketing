import React, { useEffect, useState } from "react";

/* ------------------------------- Components ------------------------------- */
import Calendar from "./Calendar";

/* ----------------------------------- API ---------------------------------- */
import {
  createAppointment,
  deleteAppointment,
  fetchAppointments,
  updateAppointment,
} from "../../api/api";

/* -------------------------------------------------------------------------- */
/*                             Calendar Container                             */
/* -------------------------------------------------------------------------- */
const CalendarContainer = () => {
  const [selectedViewName, setSelectedViewName] = useState("Week");
  const [editingAppointment, setEditingAppointment] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [currentDate, setCurrentDate] = useState("2018-07-25");

  const loadAppointments = () => {
    fetchAppointments().then((appointments) => setAppointments(appointments));
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const currentDateChange = (date) => {
    setCurrentDate(date);
  };

  const changeSelectedViewName = (viewName) => {
    setSelectedViewName(viewName);
  };

  const changeEditingAppointment = (data) => {
    console.log("Edit - ", data);
    setEditingAppointment(data);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      createAppointment({
        ...added,
        startDate: added.startDate.toISOString(),
        endDate: added.endDate.toISOString(),
      }).then(() => loadAppointments());
    }

    if (changed) {
      console.log(changed);
      updateAppointment(
        { ...editingAppointment, ...changed[editingAppointment.id] },
        editingAppointment.id
      ).then(() => loadAppointments());
    }

    if (deleted !== undefined) {
      console.log(deleted);
      deleteAppointment(deleted).then(() => loadAppointments());
    }
  };

  /* --------------------------------- Render --------------------------------- */
  return (
    <Calendar
      {...{
        appointments,
        selectedViewName,
        editingAppointment,
        currentDate,
        commitChanges,
        changeSelectedViewName,
        changeEditingAppointment,
        currentDateChange,
      }}
    />
  );
};

export default CalendarContainer;
