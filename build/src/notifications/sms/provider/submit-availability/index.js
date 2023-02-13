"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAvailability = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const submitAvailability = async (provider) => {
    (0, logger_1.logInfo)("Sending SMS message to provider about submitting availability", {
        provider,
    });
    const { title, firstName, lastName, phone } = provider;
    const smsMessageParams = {
        Message: `Dear ${title} ${firstName} ${lastName}. Please provide your availability for the next week: https://calendly.com/login`,
        PhoneNumber: (0, trim_phone_number_1.trimPhoneNumber)(phone) || "",
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
exports.submitAvailability = submitAvailability;
//# sourceMappingURL=index.js.map