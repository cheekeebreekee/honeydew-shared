export interface SetStatusTagEventPayload {
    patientId: string;
    tag: string;
    add: boolean;
}

export enum EVENTBRIDGE_EVENT_TYPES {
    MARKETING_SET_STATUS_TAG = "marketing/set-tag",
    MARKETING_FACEBOOK_EVENT = "marketing/facebook-event"
}
