/* ---------------------------------- Utils --------------------------------- */
import app from "../utils/config";

/* -------------------------------- Firebase -------------------------------- */
import { get, getDatabase, push, ref, remove, set } from "firebase/database";

/* --------------------------- Fetch Appointments --------------------------- */
export const fetchAppointments = async () => {
  const db = getDatabase(app);
  const dbRef = ref(db, "appointments");
  const snap = await get(dbRef);

  if (snap.exists()) {
    return Object.keys(snap.val()).map((appointment) => {
      return { id: appointment, ...snap.val()[appointment] };
    });
  } else {
    console.log("Error while fetching appointments");
  }
};

export const createAppointment = async (appointment) => {
  const db = getDatabase(app);
  const dbRef = push(ref(db, "appointments"));
  set(dbRef, appointment)
    .then(() => {
      console.log("Appointment has been added");
    })
    .catch(() => console.log("Error while creating appointment"));
};

export const updateAppointment = async (appointment, appointment_id) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `appointments/${appointment_id}`);
  set(dbRef, appointment)
    .then(() => {
      console.log("Appointment has been updated");
    })
    .catch(() => console.log("Error while updating appointment"));
};

export const deleteAppointment = async (appointment_id) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `appointments/${appointment_id}`);
  await remove(dbRef);
};
