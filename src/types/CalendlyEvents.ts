export interface CalendlyEventType {
  uuid: string;
  kind: string;
  slug: string;
  name: string;
  duration: number;
  owner: {
    type: string;
    uuid: string;
  };
}

export interface CalendlyExtendedAssignedTo {
  name: string;
  email: string;
  primary: boolean;
}

export interface CalendlyEvent {
  uuid: string;
  assigned_to: string[];
  extended_assigned_to: CalendlyExtendedAssignedTo[];
  start_time: string;
  start_time_pretty: string;
  invitee_start_time: string;
  invitee_start_time_pretty: string;
  end_time: string;
  end_time_pretty: string;
  invitee_end_time: string;
  invitee_end_time_pretty: string;
  created_at: string;
  canceled: boolean;
  canceler_name: string | null;
  cancel_reason: string | null;
  canceled_at: string | null;
}

export interface CalendlyPayments {
  id: string;
  provider: string;
  amount: number;
  currency: string;
  terms: string;
  successful: boolean;
}

export interface CalendlyInvitee {
  uuid: string;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  text_reminder_number: string;
  timezone: string;
  created_at: string;
  is_reschedule: boolean;
  payments: CalendlyPayments[];
  canceled: boolean;
  canceler_name: string | null;
  cancel_reason: string | null;
  canceled_at: string | null;
}

export interface CalendlyQNA {
  question: string;
  answer: string;
}

export interface CalendlyTracking {
  utm_campaign: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_content: string | null;
  utm_term: string | null;
  salesforce_uuid: string | null;
}

export interface CalendlyPayload {
  event_type: CalendlyEventType;
  event: CalendlyEvent;
  invitee: CalendlyInvitee;
  questions_and_answers: CalendlyQNA[];
  questions_and_responses: { [p: string]: string };
  tracking: CalendlyTracking;
  old_invitee?: {
    cancel_reason: string | null;
  };
}

export interface CalendlyWebhookEvent {
  event: string;
  time: string;
  payload: CalendlyPayload;
}
