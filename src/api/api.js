/* ---------------------------------- Utils --------------------------------- */
import app from '../utils/config'

/* -------------------------------- Firebase -------------------------------- */
import { get, getDatabase, ref } from 'firebase/database'

/* --------------------------- Fetch Appointments --------------------------- */
export const fetchAppointments = async () => {
  const db = getDatabase(app)
  const dbRef = ref(db, "appointments")
  const snap = await get(dbRef)

  if (snap.exists()) {
    return Object.values(snap.val())
  } else {
    console.log("Error while fetching appointments")
  }
}

