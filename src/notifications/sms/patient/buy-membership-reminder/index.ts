import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { ACNE_APP_URL } from "../../../../constants";
import { arePhoneNumbersEqual } from "../../../../utils/are-phone-number-equal";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

const afterAppointmentMessage = () =>
  `Good news! Your Honeydew dermatology clinician uploaded your treatment plan.
  Log in to view your plan and start your service: ${ACNE_APP_URL}/initiate-membership.\n\nHave questions? Call us at 516-210-5600`;

const afterTwoHoursMessage = () =>
  `Honeydew Reminder: Don't forget to sign up so we can process your treatment plan! Login here: ${ACNE_APP_URL}/initiate-membership.\n\nHave questions? Call us at 516-210-5600`;

const afterOneDayMessage = () =>
  `Your Honeydew care team and treatment plan are waiting for you! Start your care today by logging in and initiating your membership: ${ACNE_APP_URL}/initiate-membership\n\nExpert skin care is one click away.\n\nHave questions? Call us at 516-210-5600`;

const afterThreeDaysMessage = () =>
  `REMINDER: Your dermatology treatment plan is ready on Honeydew. Login to confirm your plan and start your service: ${ACNE_APP_URL}/initiate-membership.`;

const afterOneWeekMessage = () =>
  `Hey! Your Honeydew care team and treatment plan are still waiting for you. Confirm your membership BY TODAY and get 20% off using PROMO code BetterLateThanNever\n\nClick here: ${ACNE_APP_URL}/initiate-membership.\n\n
  Not sure what you get as a member? You get hassle-free, effective acne care. The right way. With licensed professionals, consistent follow-ups, and progress tracking.\n\nHave questions? Call us at 516-210-5600`;

const generatePublishPayload = (
  Message: string,
  phone: string
): SNS.PublishInput => ({
  Message,
  PhoneNumber: phone || "",
  MessageAttributes: {
    "AWS.SNS.SMS.SenderID": {
      DataType: "String",
      StringValue: "Honeydew",
    },
  },
});

const generateNotification =
  (getMessage: () => string) =>
  async (phone: string, parentsPhone?: string) => {
    logInfo("Sending SMS message to patient about buying membership");
    const queries = [
      generatePublishPayload(getMessage(), trimPhoneNumber(phone)),
    ];
    logInfo("SMS message query", queries[0]);

    if (parentsPhone && !arePhoneNumbersEqual(phone, parentsPhone)) {
      logInfo("Need to also notify parents");
      queries.push(
        generatePublishPayload(getMessage(), trimPhoneNumber(parentsPhone))
      );
      logInfo("SMS message query for parents", queries[1]);
    }

    await Promise.all(
      queries.map((query) => smsPublisher.publish(query).promise())
    );
    logInfo("Patient notified successfully");
  };

export const buyMembership = {
  afterAppointment: generateNotification(afterAppointmentMessage),
  afterTwoHours: generateNotification(afterTwoHoursMessage),
  afterOneDay: generateNotification(afterOneDayMessage),
  afterThreeDays: generateNotification(afterThreeDaysMessage),
  afterOneWeek: generateNotification(afterOneWeekMessage),
};
