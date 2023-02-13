"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFollowUp = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const constants_1 = require("../../../../constants");
const logger_1 = require("../../../../utils/logger");
const dynamodb_1 = require("../../../../dynamodb");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const newFollowUp = async (payload) => {
    (0, logger_1.logInfo)("Sending SMS message to provider about new follow-up", {
        payload,
    });
    const provider = typeof payload === "string"
        ? await dynamodb_1.DynamoDBService.providers.get(payload)
        : payload;
    (0, logger_1.logInfo)("Provider to notify", provider);
    const smsMessageParams = {
        Message: `You have a new follow-up visit! Please go to your Honeydew dashboard to view it and respond. ${constants_1.ACNE_APP_URL}`,
        PhoneNumber: (0, trim_phone_number_1.trimPhoneNumber)(provider.phone) || "",
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
exports.newFollowUp = newFollowUp;
//# sourceMappingURL=index.js.map