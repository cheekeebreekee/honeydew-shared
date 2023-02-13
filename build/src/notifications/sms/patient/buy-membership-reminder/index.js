"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyMembership = void 0;
const aws_sdk_1 = require("aws-sdk");
const trim_phone_number_1 = require("../../../../utils/trim-phone-number");
const constants_1 = require("../../../../constants");
const are_phone_number_equal_1 = require("../../../../utils/are-phone-number-equal");
const logger_1 = require("../../../../utils/logger");
const smsPublisher = new aws_sdk_1.SNS({ apiVersion: "2010-03-31" });
const afterAppointmentMessage = () => `Good news! Your Honeydew dermatology clinician uploaded your treatment plan.
  Log in to view your plan and start your service: ${constants_1.ACNE_APP_URL}/initiate-membership.\n\nHave questions? Call us at 516-210-5600`;
const afterTwoHoursMessage = () => `Honeydew Reminder: Don't forget to sign up so we can process your treatment plan! Login here: ${constants_1.ACNE_APP_URL}/initiate-membership.\n\nHave questions? Call us at 516-210-5600`;
const afterOneDayMessage = () => `Your Honeydew care team and treatment plan are waiting for you! Start your care today by logging in and initiating your membership: ${constants_1.ACNE_APP_URL}/initiate-membership\n\nExpert skin care is one click away.\n\nHave questions? Call us at 516-210-5600`;
const afterThreeDaysMessage = () => `REMINDER: Your dermatology treatment plan is ready on Honeydew. Login to confirm your plan and start your service: ${constants_1.ACNE_APP_URL}/initiate-membership.`;
const afterOneWeekMessage = () => `Hey! Your Honeydew care team and treatment plan are still waiting for you. Confirm your membership BY TODAY and get 20% off using PROMO code BetterLateThanNever\n\nClick here: ${constants_1.ACNE_APP_URL}/initiate-membership.\n\n
  Not sure what you get as a member? You get hassle-free, effective acne care. The right way. With licensed professionals, consistent follow-ups, and progress tracking.\n\nHave questions? Call us at 516-210-5600`;
const generatePublishPayload = (Message, phone) => ({
    Message,
    PhoneNumber: phone || "",
    MessageAttributes: {
        "AWS.SNS.SMS.SenderID": {
            DataType: "String",
            StringValue: "Honeydew",
        },
    },
});
const generateNotification = (getMessage) => async (phone, parentsPhone) => {
    (0, logger_1.logInfo)("Sending SMS message to patient about buying membership");
    const queries = [
        generatePublishPayload(getMessage(), (0, trim_phone_number_1.trimPhoneNumber)(phone)),
    ];
    (0, logger_1.logInfo)("SMS message query", queries[0]);
    if (parentsPhone && !(0, are_phone_number_equal_1.arePhoneNumbersEqual)(phone, parentsPhone)) {
        (0, logger_1.logInfo)("Need to also notify parents");
        queries.push(generatePublishPayload(getMessage(), (0, trim_phone_number_1.trimPhoneNumber)(parentsPhone)));
        (0, logger_1.logInfo)("SMS message query for parents", queries[1]);
    }
    await Promise.all(queries.map((query) => smsPublisher.publish(query).promise()));
    (0, logger_1.logInfo)("Patient notified successfully");
};
exports.buyMembership = {
    afterAppointment: generateNotification(afterAppointmentMessage),
    afterTwoHours: generateNotification(afterTwoHoursMessage),
    afterOneDay: generateNotification(afterOneDayMessage),
    afterThreeDays: generateNotification(afterThreeDaysMessage),
    afterOneWeek: generateNotification(afterOneWeekMessage),
};
//# sourceMappingURL=index.js.map