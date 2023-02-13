"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelledAppointment = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const get_date_pretty_1 = require("../../../../utils/get-date-pretty");
const get_patient_initials_1 = require("../../../../utils/get-patient-initials");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const cancelledAppointment = async (provider, patient) => {
    (0, logger_1.logInfo)("Sending SMS message to provider about cancelled appointment", {
        provider,
        patient,
    });
    const { firstName, lastName, phone } = provider;
    const smsMessageParams = {
        Message: `Dear ${firstName} ${lastName}. \nAn appointment at ${(0, get_date_pretty_1.getDatePretty)(patient.appointments[0].start_time)} was cancelled for patient ${(0, get_patient_initials_1.getPatientInitials)(patient)} (DOB ${patient.basicInfo.birthdate}).`,
        PhoneNumber: (phone && (0, trim_phone_number_1.trimPhoneNumber)(phone)) || "",
        MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
                DataType: "String",
                StringValue: "Honeydew",
            },
        },
    };
    (0, logger_1.logInfo)("SMS message query", smsMessageParams);
    await smsPublisher.publish(smsMessageParams).promise();
    (0, logger_1.logInfo)("Provider notified succesfully");
};
exports.cancelledAppointment = cancelledAppointment;
//# sourceMappingURL=index.js.map