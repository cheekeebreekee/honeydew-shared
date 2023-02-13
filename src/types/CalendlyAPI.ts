export interface CalendlyCollection<T> {
  collection: T[];
  pagination: {
    count: number;
    next_page: string | null;
    prev_page: string | null;
  };
}

export interface CalendlyMembership<T> {
  uri: string;
  role: string;
  user: T;
  organization: string;
  updated_at: string;
  created_at: string;
}

export interface CalendlyUser {
  uri: string;
  name: string;
  slug: string;
  email: string;
  scheduling_uri: string;
  timezone: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

interface CalendlyEventTypeCustomQuestions {
  name: string;
  type: string;
  position: string;
  enabled: boolean;
  required: boolean;
  answer_choices: string[];
  include_other: boolean;
}

interface CalendlyProfile {
  type: "User" | "Team";
  name: string;
  owner: string;
}

export interface CalendlyEventType {
  uri: string;
  name: string;
  active: boolean;
  slug: string;
  scheduling_url: string;
  duration: number;
  kind: string;
  pooling_type: string;
  type: string;
  color: string;
  created_at: string;
  updated_at: string;
  internal_note: string;
  description_plain: string;
  description_html: string;
  profile: CalendlyProfile;
  secret: boolean;
  booking_method: string;
  custom_questions: CalendlyEventTypeCustomQuestions[];
}

export interface CalendlySingleUseLinkResponse {
  resource: {
    booking_url: string;
    owner: string;
    owner_type: string;
  };
}
