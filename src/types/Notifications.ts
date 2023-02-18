export enum NOTIFICATION_TYPES {
  SMS = "sms",
  INTERACTIVE_SMS = "interactive-sms",
  EMAIL = "email",
}

export type NotificationPayload = any;

export interface NotificationEvent {
  type: NOTIFICATION_TYPES;
  template: string;
  data: NotificationPayload;
  targetAddresses: string[];
}
