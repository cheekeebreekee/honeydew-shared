export const DEFAULT_RESPONSE_HEADERS = {
  "X-Requested-With": "*",
  "Access-Control-Allow-Headers":
    "Content-Type,x_client_device_id,x_client_id,x-sr-token,x-endpoint-version",
  "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Expose-Headers":
    "Access-Control-Allow-Origin,Access-Control-Allow-Methods,X-JSESSIONID,x-sr-token-valid",
};

export const REMOTE_DERMATOLOGY_PC_ACCOUNT_ID = "acct_1K9XPKIZbNjZjzER";
export const ACNE_DASHBOARD_URL = "https://app.honeydewcare.com/login";
export const ACNE_SURVEY_URL = "https://survey.honeydewcare.com";
export const SIGN_NOW_BASE_URL = "https://api.signnow.com";
export const ACNE_APP_URL = "https://app.honeydewcare.com";

export const SUBSCRIPTIONS_PRETTY: { [p: string]: string } = {
  month: "Monthly subscription",
  year: "Annual subscription",
};
