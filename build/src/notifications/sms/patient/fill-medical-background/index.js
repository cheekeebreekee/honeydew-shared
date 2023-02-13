"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillMedicalBackground = void 0;
const aws_sdk_1 = require("aws-sdk");
const get_date_pretty_1 = require("src/utils/get-date-pretty");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const constants_1 = require("../../../../constants");
const are_phone_number_equal_1 = require("../../../../utils/are-phone-number-equal");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const fillMedicalBackgroundNotificationQuery = (appointmentDate, phone) => ({
    Message: `Honeydew Care:\n\nYour dermatology consultation is scheduled for ${(0, get_date_pretty_1.getMomentDate)(appointmentDate).format("MMMM Do, h:mm A")}! We are still missing your answers to our skin and medical background questionnaire. Please login and submit them now: ${constants_1.ACNE_APP_URL}/skin-survey\n\nYour clinician can't do a visit without these answers. Please submit them at least 3 hours before your visit to avoid cancellation.\n\nYour Honeydew clinician is excited to meet you soon!\n\nHave questions? Call us at 516-210-5600`,
    PhoneNumber: (0, trim_phone_number_1.trimPhoneNumber)(phone) || "",
    MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: "Honeydew",
        },
    },
});
const fillMedicalBackground = async (patient) => {
    (0, logger_1.logInfo)("Sending SMS message to patient about filling medical background", {
        patient,
    });
    if (!patient.appointments) {
        (0, logger_1.logInfo)("Patient still doesn't have an appointment. Skip");
        return;
    }
    if (!patient.phone) {
        (0, logger_1.logInfo)("Patient doesn't have a phone number yet. Skip");
        return;
    }
    const queries = [
        fillMedicalBackgroundNotificationQuery(patient.appointments[0].start_time, patient.phone),
    ];
    (0, logger_1.logInfo)("SMS message query", queries[0]);
    if (patient.basicInfo.parentsPhone &&
        !(0, are_phone_number_equal_1.arePhoneNumbersEqual)(patient.appointments[0].start_time, patient.basicInfo.parentsPhone)) {
        (0, logger_1.logInfo)("Need to also notify parents");
        queries.push(fillMedicalBackgroundNotificationQuery(patient.id, patient.basicInfo.parentsPhone));
        (0, logger_1.logInfo)("SMS message query for parents", queries[1]);
    }
    await Promise.all(queries.map((query) => smsPublisher.publish(query).promise()));
    (0, logger_1.logInfo)("Patient notified successfully");
};
exports.fillMedicalBackground = fillMedicalBackground;
//# sourceMappingURL=index.js.map