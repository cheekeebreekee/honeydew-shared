"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessageInChat = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const constants_1 = require("../../../../constants");
const are_phone_number_equal_1 = require("../../../../utils/are-phone-number-equal");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const getQuery = (phone) => ({
    Message: `You have a new chat message from your care team! Please go to your Honeydew dashboard to view it and respond. ${constants_1.ACNE_APP_URL}`,
    PhoneNumber: (0, trim_phone_number_1.trimPhoneNumber)(phone) || "",
    MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: "Honeydew",
        },
    },
});
const newMessageInChat = async (patient) => {
    (0, logger_1.logInfo)("Sending SMS message to patient about new message in chat", {
        patient,
    });
    const queries = [getQuery(patient.phone)];
    (0, logger_1.logInfo)("SMS message query", queries[0]);
    if (patient.basicInfo.parentsPhone &&
        !(0, are_phone_number_equal_1.arePhoneNumbersEqual)(patient.phone, patient.basicInfo.parentsPhone)) {
        (0, logger_1.logInfo)("Need to also notify parents");
        queries.push(getQuery(patient.basicInfo.parentsPhone));
        (0, logger_1.logInfo)("SMS message query for parents", queries[1]);
    }
    await Promise.all(queries.map((query) => smsPublisher.publish(query).promise()));
    (0, logger_1.logInfo)("Patient notified successfully");
};
exports.newMessageInChat = newMessageInChat;
//# sourceMappingURL=index.js.map