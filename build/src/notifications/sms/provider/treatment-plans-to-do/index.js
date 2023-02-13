"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treatmentPlansToDo = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const constants_1 = require("../../../../constants");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const treatmentPlansToDo = async (provider) => {
    (0, logger_1.logInfo)("Sending SMS message to provider about treatment plans to do", {
        provider,
    });
    const { phone } = provider;
    const smsMessageParams = {
        Message: `Honeydew Reminder: You have an outstanding treatment plan that needs submission. Patients can't sign up until you submit their initial treatment plan. ${constants_1.ACNE_APP_URL}`,
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
exports.treatmentPlansToDo = treatmentPlansToDo;
//# sourceMappingURL=index.js.map