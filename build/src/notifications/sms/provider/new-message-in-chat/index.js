"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessageInChat = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const constants_1 = require("../../../../constants");
const get_patient_initials_1 = require("../../../../utils/get-patient-initials");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const newMessageInChat = async (patient, provider) => {
    (0, logger_1.logInfo)("Sending SMS message to provider about new message in chat", {
        patient,
        provider,
    });
    const { firstName, lastName } = provider;
    const smsMessageParams = {
        Message: `Honeydew Reminder: Dear ${firstName} ${lastName}. You have new message in chat. Patient - ${(0, get_patient_initials_1.getPatientInitials)(patient)}; Date of birth - ${patient.basicInfo.birthdate}.\n${constants_1.ACNE_APP_URL}`,
        PhoneNumber: (provider.phone && (0, trim_phone_number_1.trimPhoneNumber)(provider.phone)) || "",
        MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
                DataType: "String",
                StringValue: "Honeydew",
            },
        },
    };
    (0, logger_1.logInfo)("SMS message query", smsMessageParams);
    await smsPublisher.publish(smsMessageParams).promise();
    (0, logger_1.logInfo)("Provider notified successfully");
};
exports.newMessageInChat = newMessageInChat;
//# sourceMappingURL=index.js.map