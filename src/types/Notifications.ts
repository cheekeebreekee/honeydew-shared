export enum NOTIFICATION_TYPES {
  SMS = "sms",
  INTERACTIVE_SMS = "interactive-sms",
  EMAIL = "email",
}

export type NotificationPayload = any;

export interface HoneydewNotificationEvent {
  type: NOTIFICATION_TYPES;
  template: string;
  data: NotificationPayload;
  targetAddresses: string[];
  patientId?: string; // needed to save a record about interactive SMS
}
