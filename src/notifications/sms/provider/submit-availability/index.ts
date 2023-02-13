import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { Provider } from "../../../../types/Provider";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

export const submitAvailability = async (provider: Provider) => {
  logInfo("Sending SMS message to provider about submitting availability", {
    provider,
  });
  const { title, firstName, lastName, phone } = provider;
  const smsMessageParams = {
    Message: `Dear ${title} ${firstName} ${lastName}. Please provide your availability for the next week: https://calendly.com/login`,
    PhoneNumber: trimPhoneNumber(phone) || "",
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "Honeydew",
      },
    },
  };
  logInfo("SMS message query", smsMessageParams);

  await smsPublisher.publish(smsMessageParams).promise();
  logInfo("Provider notified successfully");
};
