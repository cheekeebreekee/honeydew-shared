"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentToDecline = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const get_date_pretty_1 = require("../../../../utils/get-date-pretty");
const get_patient_initials_1 = require("../../../../utils/get-patient-initials");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const appointmentToDecline = async (careCoordinator, patient) => {
    const { firstName, lastName, phone } = careCoordinator;
    (0, logger_1.logInfo)("Sending SMS message to care coordinator about appointment to decline", {
        careCoordinator,
    });
    const smsMessageParams = {
        Message: `Dear ${firstName} ${lastName}.\nPatient ${(0, get_patient_initials_1.getPatientInitials)(patient)} (DOB ${patient.basicInfo.birthdate}) wants to cancel an appointment at ${(0, get_date_pretty_1.getDatePretty)(patient.appointments[0].start_time)}. \nPatient's phone number: ${patient.phone}`,
        PhoneNumber: (phone && (0, trim_phone_number_1.trimPhoneNumber)(phone)) || "",
        MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
                DataType: "String",
                StringValue: "Honeydew",
            },
        },
    };
    (0, logger_1.logInfo)("SMS message query", smsMessageParams);
    // await smsPublisher.publish(smsMessageParams).promise();
    (0, logger_1.logInfo)("SMS message disabled");
    // logInfo("Care coordinator notified successfully");
};
exports.appointmentToDecline = appointmentToDecline;
//# sourceMappingURL=index.js.map