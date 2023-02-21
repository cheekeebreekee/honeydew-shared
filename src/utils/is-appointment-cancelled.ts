import { Patient } from "../types";

export function isAppointmentCancelled(patient: Patient) {
  const lastAppointmentStatus = patient.appointmentStatus
    ? patient.appointmentStatus[0].status
    : "";

  return lastAppointmentStatus === "cancelled";
}
