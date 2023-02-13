"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentCancellationReply = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const appointmentCancellationReply = async (patient) => {
    (0, logger_1.logInfo)("Sending SMS reply message to patient about rescheduling an appointment", {
        patient,
    });
    const smsMessageParams = {
        Message: `Okay! Thanks for letting us know. Here is a link to reschedule your appointment: https://calendly.com/reschedulings/${patient.calendly_invitee_id}`,
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
exports.appointmentCancellationReply = appointmentCancellationReply;
//# sourceMappingURL=index.js.map