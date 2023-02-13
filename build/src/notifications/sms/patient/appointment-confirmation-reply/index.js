"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentConfirmationReply = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const appointmentConfirmationReply = async (patient) => {
    (0, logger_1.logInfo)("Sending SMS reply message to patient about appointment confirmation", {
        patient,
    });
    const smsMessageParams = {
        Message: `Thank you! Your appointment is confirmed. See you soon`,
        PhoneNumber: (patient.phone && (0, trim_phone_number_1.trimPhoneNumber)(patient.phone)) || "",
        MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
                DataType: "String",
                StringValue: "Honeydew",
            },
        },
    };
    (0, logger_1.logInfo)("SMS message query", smsMessageParams);
    await smsPublisher.publish(smsMessageParams).promise();
    (0, logger_1.logInfo)("Patient notified successfully");
};
exports.appointmentConfirmationReply = appointmentConfirmationReply;
//# sourceMappingURL=index.js.map