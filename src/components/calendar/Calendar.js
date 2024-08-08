import React from 'react'

/* ------------------------------- Components ------------------------------- */
import { Paper } from '@mui/material'
import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler'
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView
} from '@devexpress/dx-react-scheduler-material-ui'

/* --------------------------------- Locales -------------------------------- */
import { formLocalizationPL } from '../../locales/formLocalizationPL'

/* -------------------------------------------------------------------------- */
/*                                  Calendar                                  */
/* -------------------------------------------------------------------------- */
const Calendar = ({
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
}) => {

  /* --------------------------------- Render --------------------------------- */
  return (
    <Paper>
        <Scheduler
          data={appointments}
          locale={'pl-PL'}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={currentDateChange}
            currentViewName={selectedViewName}
            onCurrentViewNameChange={changeSelectedViewName}
          />
          <EditingState
            onCommitChanges={commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={changeEditingAppointment}
          />
          <IntegratedEditing />

          <DayView displayName='Dzienny' />
          <WeekView displayName='Tygodniowy'/>
          <MonthView displayName='Miesięczny' />

          <Toolbar />
          <DateNavigator />
          <TodayButton messages={{ today: "Dzisiaj"}}/>
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm
            messages={formLocalizationPL}
            recurrenceLayoutComponent={() => (<></>)}
            booleanEditorComponent={(data) => {console.log(data)}}
          />
        </Scheduler>
      </Paper>
  )
}

export default Calendar
