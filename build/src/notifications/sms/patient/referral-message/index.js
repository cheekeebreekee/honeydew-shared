"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referralMessage = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const are_phone_number_equal_1 = require("../../../../utils/are-phone-number-equal");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const referrerMessage = () => `Honeydew Care:\n
🎊 You just earned two months free for referring a friend!\n
It will be automatically applied to your next payment. Thanks for your support 🙌🏾`;
const referreeMessage = () => `Honeydew Care:\n
Welcome to Honeydew! You have a two months free75 bonus for being referred 🥳\n
It will be automatically applied to your next payment.`;
const generatePublishPayload = (Message, phone) => ({
    Message,
    PhoneNumber: (0, trim_phone_number_1.trimPhoneNumber)(phone) || "",
    MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: "Honeydew",
        },
    },
});
const generateNotification = (getMessage) => async (phone, parentsPhone) => {
    (0, logger_1.logInfo)("Sending SMS message to patient about referral earnings");
    const queries = [generatePublishPayload(getMessage(), phone)];
    (0, logger_1.logInfo)("SMS message query", queries[0]);
    if (parentsPhone && !(0, are_phone_number_equal_1.arePhoneNumbersEqual)(phone, parentsPhone)) {
        (0, logger_1.logInfo)("Need to also notify parents");
        queries.push(generatePublishPayload(getMessage(), parentsPhone));
        (0, logger_1.logInfo)("SMS message query for parents", queries[1]);
    }
    await Promise.all(queries.map((query) => smsPublisher.publish(query).promise()));
    (0, logger_1.logInfo)("Patient notified successfully");
};
exports.referralMessage = {
    referrer: generateNotification(referrerMessage),
    referree: generateNotification(referreeMessage),
};
//# sourceMappingURL=index.js.map