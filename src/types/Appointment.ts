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

export interface AppointmentServiceConfig {
  calendly: {
    baseUrl: string;
    apiToken: string;
    organization: string;
    baseEvent: string;
  }
}