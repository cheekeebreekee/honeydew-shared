export interface AppointmentHistory {
  status: string;
  timestamp: number;
  appointmentId: string;
  reason?: string;
}

export interface Appointment {
  patientId: string;
  appointmentId: string;
  timestamp: number;
  startTime: string;
  endTime: string;
  history: AppointmentHistory[];
}
