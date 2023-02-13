import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { arePhoneNumbersEqual } from "../../../../utils/are-phone-number-equal";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

const referrerMessage = () =>
  `Honeydew Care:\n
🎊 You just earned two months free for referring a friend!\n
It will be automatically applied to your next payment. Thanks for your support 🙌🏾`;

const referreeMessage = () =>
  `Honeydew Care:\n
Welcome to Honeydew! You have a two months free75 bonus for being referred 🥳\n
It will be automatically applied to your next payment.`;

const generatePublishPayload = (
  Message: string,
  phone: string
): SNS.PublishInput => ({
  Message,
  PhoneNumber: trimPhoneNumber(phone) || "",
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
    logInfo("Sending SMS message to patient about referral earnings");
    const queries = [generatePublishPayload(getMessage(), phone)];
    logInfo("SMS message query", queries[0]);

    if (parentsPhone && !arePhoneNumbersEqual(phone, parentsPhone)) {
      logInfo("Need to also notify parents");
      queries.push(generatePublishPayload(getMessage(), parentsPhone));
      logInfo("SMS message query for parents", queries[1]);
    }

    await Promise.all(
      queries.map((query) => smsPublisher.publish(query).promise())
    );
    logInfo("Patient notified successfully");
  };

export const referralMessage = {
  referrer: generateNotification(referrerMessage),
  referree: generateNotification(referreeMessage),
};
