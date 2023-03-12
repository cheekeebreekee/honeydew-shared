export interface SetStatusTagEventPayload {
    patientId: string;
    statusTag: string;
    isActive: boolean;
}

export enum EVENTBRIDGE_EVENT_TYPES {
    MARKETING_SET_STATUS_TAG = "marketing/set-tag",
    MARKETING_FACEBOOK_EVENT = "marketing/facebook-event"
}
