"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upcomingFollowUp = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const constants_1 = require("../../../../constants");
const are_phone_number_equal_1 = require("../../../../utils/are-phone-number-equal");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const getQuery = (phone) => ({
    Message: `Honeydew Reminder: It's time to follow-up with your provider! Please go to your Honeydew dashboard and press 'Start Follow-Up Visit' to share some updates and photos of your skin with your provider. ${constants_1.ACNE_APP_URL}`,
    PhoneNumber: (0, trim_phone_number_1.trimPhoneNumber)(phone) || "",
    MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: "Honeydew",
        },
    },
});
const upcomingFollowUp = async (patient) => {
    (0, logger_1.logInfo)("Sending SMS notification to patient about upcoming follow-up", {
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
exports.upcomingFollowUp = upcomingFollowUp;
//# sourceMappingURL=index.js.map