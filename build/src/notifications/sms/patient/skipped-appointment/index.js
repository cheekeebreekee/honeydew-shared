"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skippedAppointment = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const constants_1 = require("../../../../constants");
const are_phone_number_equal_1 = require("../../../../utils/are-phone-number-equal");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const skippedAppointmentNotificationQuery = (patient, phone) => ({
    Message: `Hey! It looks like you missed your initial consultation with your Honeydew dermatology provider, which was scheduled for ${patient.appointments[0].invitee_start_time_pretty}.\nNo worries, we let you reschedule once more for free before requiring a membership signup. Use this link to reschedule your initial consultation: ${constants_1.ENV.CALENDLY_APPOINTMENT_URL}?utm_source=${patient.id}`,
    PhoneNumber: (0, trim_phone_number_1.trimPhoneNumber)(phone) || "",
    MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: "Honeydew",
        },
    },
});
const skippedAppointment = async (patient) => {
    (0, logger_1.logInfo)("Sending SMS message to patient about skipped appointment", {
        patient,
    });
    const queries = [skippedAppointmentNotificationQuery(patient, patient.phone)];
    (0, logger_1.logInfo)("SMS message query", queries[0]);
    if (patient.basicInfo.parentsPhone &&
        !(0, are_phone_number_equal_1.arePhoneNumbersEqual)(patient.phone, patient.basicInfo.parentsPhone)) {
        (0, logger_1.logInfo)("Need to also notify parents");
        queries.push(skippedAppointmentNotificationQuery(patient, patient.basicInfo.parentsPhone));
        (0, logger_1.logInfo)("SMS message query for parents", queries[1]);
    }
    await Promise.all(queries.map((query) => smsPublisher.publish(query).promise()));
    (0, logger_1.logInfo)("Patient notified successfully");
};
exports.skippedAppointment = skippedAppointment;
//# sourceMappingURL=index.js.map