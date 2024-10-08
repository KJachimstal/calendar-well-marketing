import React from "react";

/* ------------------------------- Components ------------------------------- */
import { Paper } from "@mui/material";
import { EditingState, ViewState } from "@devexpress/dx-react-scheduler";
import {
  AllDayPanel,
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  EditRecurrenceMenu,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";

/* --------------------------------- Locales -------------------------------- */
import { formLocalization, recurrenceMenuLocalization } from "../../locales/localization";

/* -------------------------------------------------------------------------- */
/*                                  Calendar                                  */
/* -------------------------------------------------------------------------- */
const Calendar = ({
  appointments,
  selectedViewName,
  editingAppointment,
  currentDate,
  commitChanges,
  changeSelectedViewName,
  changeEditingAppointment,
  currentDateChange,
}) => {
  /* --------------------------------- Render --------------------------------- */
  return (
    <Paper style={{ height: "100vh" }}>
      <Scheduler data={appointments} locale={"pl-PL"}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
          currentViewName={selectedViewName}
          onCurrentViewNameChange={changeSelectedViewName}
        />
        <EditingState
          onCommitChanges={commitChanges}
          editingAppointment={editingAppointment}
          onEditingAppointmentChange={changeEditingAppointment}
        />
        <EditRecurrenceMenu messages={recurrenceMenuLocalization} />

        <DayView displayName="Dzienny" />
        <WeekView displayName="Tygodniowy" />
        <MonthView displayName="Miesięczny" />

        <AllDayPanel messages={{ allDay: "Cały dzień" }} />
        <Toolbar />
        <DateNavigator />
        <TodayButton messages={{ today: "Dzisiaj" }} />
        <ViewSwitcher />
        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
        <AppointmentForm
          messages={formLocalization}
          booleanEditorComponent={(props) => {
            if (props.label === "Powtarzaj") {
              return null;
            }
            return <AppointmentForm.BooleanEditor {...props} />;
          }}
        />
      </Scheduler>
    </Paper>
  );
};

export default Calendar;
