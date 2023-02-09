export const DEFAULT_RESPONSE_HEADERS = {
  "X-Requested-With": "*",
  "Access-Control-Allow-Headers":
    "Content-Type,x_client_device_id,x_client_id,x-sr-token,x-endpoint-version",
  "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers":
    "Access-Control-Allow-Origin,Access-Control-Allow-Methods,X-JSESSIONID,x-sr-token-valid",
};

export const MAILCHIMP_CONFIG = {
  LIST_ID: "bd2a4d56d5",
  API_KEY: "c77f279db92fb6814045c2255c5a99ff-us6",
  SERVER: "us6",
};

export const REMOTE_DERMATOLOGY_PC_ACCOUNT_ID = "acct_1K9XPKIZbNjZjzER";
export const ACNE_DASHBOARD_URL = "https://app.honeydewcare.com/login";
export const ACNE_SURVEY_URL = "https://survey.honeydewcare.com";
export const SIGN_NOW_BASE_URL = "https://api.signnow.com";

export const SUBSCRIPTIONS_PRETTY: { [p: string]: string } = {
  month: "Monthly subscription",
  year: "Annual subscription",
};

export const ENV: { [p: string]: string } = {
  USERS_TABLE: process.env.USERS_TABLE as string,
  PROVIDERS_TABLE: process.env.PROVIDERS_TABLE as string,
  CARE_COORDINATORS_TABLE: process.env.CARE_COORDINATORS_TABLE as string,
  ENROLLMENT_COORDINATORS_TABLE: process.env
    .ENROLLMENT_COORDINATORS_TABLE as string,
  MEDICINE_TABLE: process.env.MEDICINE_TABLE as string,
  TREATMENT_PLANS_TABLE: process.env.TREATMENT_PLANS_TABLE as string,
  ACCUTANE_TABLE: process.env.ACCUTANE_TABLE as string,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
  ACCUTANE_DOCUMENTS_BUCKET_NAME: process.env
    .ACCUTANE_DOCUMENTS_BUCKET_NAME as string,
  ACCUTANE_DOCUMENTS_TABLE: process.env.ACCUTANE_DOCUMENTS_TABLE as string,
  ACCUTANE_NOTIFICATIONS_TABLE: process.env
    .ACCUTANE_NOTIFICATIONS_TABLE as string,
  ACCUTANE_TASKS_TABLE: process.env.ACCUTANE_TASKS_TABLE as string,
  ACCUTANE_PRICE_ID: process.env.ACCUTANE_PRICE_ID as string,
  ADMINS_TABLE: process.env.ADMINS_TABLE as string,
  SIGN_NOW_TOKEN: process.env.SIGN_NOW_TOKEN as string,
};

// validation for environment variables
Object.keys(ENV).forEach((key) => {
  if (!ENV[key])
    throw new Error(`Missing required environment parameter "${key}"`);
});

const development = {
  ADMINS_LIST: [
    {
      cognitoUserId: "6e7f5a4f-865f-4013-b79a-93a5fcf0521d",
      phone: "+48603467716",
      fullName: "Yahor Admin",
      email: "philipok4596@gmail.com",
      group: "admin",
      groupFriendly: "Administrator",
    },
  ],
};

const production = {
  ADMINS_LIST: [
    {
      cognitoUserId: "6e7f5a4f-865f-4013-b79a-93a5fcf0521d",
      phone: "+15165321199",
      fullName: "David Futoran",
      email: "david.futoran@honeydewcare.com",
      group: "admin",
      groupFriendly: "Administrator",
    },
    {
      cognitoUserId: "33145a4f-865f-4013-b79a-93a5fcf0521d",
      phone: "+18018343024", // TODO
      fullName: "Tamazine Davison",
      email: "tamazine.davison@honeydewcare.com",
      group: "admin",
      groupFriendly: "Administrator",
    },
  ],
};

export const { ADMINS_LIST } =
  process.env.ENVIRONMENT === "PROD" ? production : development;
