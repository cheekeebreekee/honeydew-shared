import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { ACNE_APP_URL } from "../../../../constants";
import { Provider } from "../../../../types/Provider";
import { logInfo } from "../../../../utils/logger";
import { DynamoDBService } from "../../../../dynamodb";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

export const newFollowUp = async (payload: Provider | string) => {
  logInfo("Sending SMS message to provider about new follow-up", {
    payload,
  });
  const provider =
    typeof payload === "string"
      ? await DynamoDBService.providers.get(payload)
      : payload;
  logInfo("Provider to notify", provider);

  const smsMessageParams = {
    Message: `You have a new follow-up visit! Please go to your Honeydew dashboard to view it and respond. ${ACNE_APP_URL}`,
    PhoneNumber: trimPhoneNumber(provider.phone) || "",
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
