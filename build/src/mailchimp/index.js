"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailchimpService = void 0;
const mailchimp_marketing_1 = __importDefault(require("@mailchimp/mailchimp_marketing"));
const md5_1 = __importDefault(require("md5"));
const constants_1 = require("../constants");
const logger_1 = require("../utils/logger");
mailchimp_marketing_1.default.setConfig({
    apiKey: constants_1.MAILCHIMP_CONFIG.API_KEY,
    server: constants_1.MAILCHIMP_CONFIG.SERVER,
});
// Seems like Mailchimp doesn't have all types and namespaces
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mailchimpLists = mailchimp_marketing_1.default.lists;
async function isMemberExist(patient) {
    (0, logger_1.logInfo)("Checking patient existence in mailchimp");
    const subscriberHash = (0, md5_1.default)(patient.email.toLowerCase());
    try {
        await mailchimpLists.getListMember(constants_1.MAILCHIMP_CONFIG.LIST_ID, subscriberHash);
        (0, logger_1.logInfo)("Patient has been found");
        return true;
    }
    catch (e) {
        (0, logger_1.logInfo)("Patient is not found in mailchimp");
        return false;
    }
}
async function createMember(patient) {
    (0, logger_1.logInfo)("Creating patient in mailchimp");
    const splitPoint = patient.full_name.indexOf(" ");
    const subscriberHash = (0, md5_1.default)(patient.email.toLowerCase());
    await mailchimpLists.setListMember(constants_1.MAILCHIMP_CONFIG.LIST_ID, subscriberHash, {
        status_if_new: "subscribed",
        email_address: patient.email,
        merge_fields: {
            FNAME: patient.full_name.slice(0, splitPoint),
            LNAME: patient.full_name.slice(splitPoint + 1, patient.full_name.length),
            PHONE: patient.phone || undefined,
        },
    });
    (0, logger_1.logInfo)("Patient successfully created in mailchimp");
}
async function updateMemberStatus(patient, statusName, isActive) {
    (0, logger_1.logInfo)("Perform status update");
    const subscriberHash = (0, md5_1.default)(patient.email.toLowerCase());
    await mailchimpLists.updateListMemberTags(constants_1.MAILCHIMP_CONFIG.LIST_ID, subscriberHash, {
        tags: [
            {
                name: statusName,
                status: isActive ? "active" : "inactive",
            },
        ],
    });
    (0, logger_1.logInfo)("Status of the patient has been updated in mailchimp");
}
async function setStatus(patient, statusName, isActive) {
    (0, logger_1.logInfo)("Setting status of the patient in mailcimp", {
        patient,
        statusName,
        isActive,
    });
    if (!(await isMemberExist(patient))) {
        (0, logger_1.logInfo)("Perform patient creation in mailchimp due to patient absence in system");
        await createMember(patient);
    }
    await updateMemberStatus(patient, statusName, isActive);
}
exports.MailchimpService = {
    setStatus,
};
//# sourceMappingURL=index.js.map