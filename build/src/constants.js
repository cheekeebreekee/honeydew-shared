"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMINS_LIST = exports.ENV = exports.SUBSCRIPTIONS_PRETTY = exports.ACNE_APP_URL = exports.SIGN_NOW_BASE_URL = exports.ACNE_SURVEY_URL = exports.ACNE_DASHBOARD_URL = exports.REMOTE_DERMATOLOGY_PC_ACCOUNT_ID = exports.MAILCHIMP_CONFIG = exports.DEFAULT_RESPONSE_HEADERS = void 0;
exports.DEFAULT_RESPONSE_HEADERS = {
    "X-Requested-With": "*",
    "Access-Control-Allow-Headers": "Content-Type,x_client_device_id,x_client_id,x-sr-token,x-endpoint-version",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,DELETE",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Expose-Headers": "Access-Control-Allow-Origin,Access-Control-Allow-Methods,X-JSESSIONID,x-sr-token-valid",
};
exports.MAILCHIMP_CONFIG = {
    LIST_ID: "bd2a4d56d5",
    API_KEY: "c77f279db92fb6814045c2255c5a99ff-us6",
    SERVER: "us6",
};
exports.REMOTE_DERMATOLOGY_PC_ACCOUNT_ID = "acct_1K9XPKIZbNjZjzER";
exports.ACNE_DASHBOARD_URL = "https://app.honeydewcare.com/login";
exports.ACNE_SURVEY_URL = "https://survey.honeydewcare.com";
exports.SIGN_NOW_BASE_URL = "https://api.signnow.com";
exports.ACNE_APP_URL = "https://app.honeydewcare.com";
exports.SUBSCRIPTIONS_PRETTY = {
    month: "Monthly subscription",
    year: "Annual subscription",
};
exports.ENV = {
    USERS_TABLE: process.env.USERS_TABLE,
    PROVIDERS_TABLE: process.env.PROVIDERS_TABLE,
    CARE_COORDINATORS_TABLE: process.env.CARE_COORDINATORS_TABLE,
    ENROLLMENT_COORDINATORS_TABLE: process.env
        .ENROLLMENT_COORDINATORS_TABLE,
    MEDICINE_TABLE: process.env.MEDICINE_TABLE,
    TREATMENT_PLANS_TABLE: process.env.TREATMENT_PLANS_TABLE,
    ACCUTANE_TABLE: process.env.ACCUTANE_TABLE,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    ACCUTANE_DOCUMENTS_BUCKET_NAME: process.env
        .ACCUTANE_DOCUMENTS_BUCKET_NAME,
    ACCUTANE_DOCUMENTS_TABLE: process.env.ACCUTANE_DOCUMENTS_TABLE,
    ACCUTANE_NOTIFICATIONS_TABLE: process.env
        .ACCUTANE_NOTIFICATIONS_TABLE,
    ACCUTANE_TASKS_TABLE: process.env.ACCUTANE_TASKS_TABLE,
    ACCUTANE_PRICE_ID: process.env.ACCUTANE_PRICE_ID,
    ADMINS_TABLE: process.env.ADMINS_TABLE,
    SIGN_NOW_TOKEN: process.env.SIGN_NOW_TOKEN,
};
// validation for environment variables
Object.keys(exports.ENV).forEach((key) => {
    if (!exports.ENV[key])
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
            phone: "+18018343024",
            fullName: "Tamazine Davison",
            email: "tamazine.davison@honeydewcare.com",
            group: "admin",
            groupFriendly: "Administrator",
        },
    ],
};
exports.ADMINS_LIST = (process.env.ENVIRONMENT === "PROD" ? production : development).ADMINS_LIST;
//# sourceMappingURL=constants.js.map