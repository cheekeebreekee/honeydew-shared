export interface SetStatusTagEventPayload {
    patientId: string;
    tag: string;
    add: boolean;
}

export interface AppointmentScheduledFbEvent {
    email: string;
}
