"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessageInChat = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const constants_1 = require("../../../../constants");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const newMessageInChat = async (careCoordinator) => {
    (0, logger_1.logInfo)("Sending SMS message to care coordinator about new message in chat", {
        careCoordinator,
    });
    const smsMessageParams = {
        Message: `You have a new chat message! Please go to your Honeydew dashboard to view it and respond. ${constants_1.ACNE_APP_URL}`,
        PhoneNumber: (careCoordinator.phone && (0, trim_phone_number_1.trimPhoneNumber)(careCoordinator.phone)) || "",
        MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
                DataType: "String",
                StringValue: "Honeydew",
            },
        },
    };
    (0, logger_1.logInfo)("SMS message query", smsMessageParams);
    await smsPublisher.publish(smsMessageParams).promise();
    (0, logger_1.logInfo)("Care coordinator notified successfully");
};
exports.newMessageInChat = newMessageInChat;
//# sourceMappingURL=index.js.map