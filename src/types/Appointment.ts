export interface Appointment {
  patientId: string;
  appointmentId: string;
  timestamp: number;
  startTime: string;
  endTime: string;
  status: string;
}

export interface AppointmentServiceConfig {
  calendly: {
    baseUrl: string;
    apiToken: string;
    organization: string;
    baseEvent: string;
  }
}