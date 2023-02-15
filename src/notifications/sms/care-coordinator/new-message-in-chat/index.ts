import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { ACNE_APP_URL } from "../../../../shared/constants";
import { CareCoordinator } from "../../../../types/CareCoordinator";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

export const newMessageInChat = async (careCoordinator: CareCoordinator) => {
  logInfo("Sending SMS message to care coordinator about new message in chat", {
    careCoordinator,
  });
  const smsMessageParams = {
    Message: `You have a new chat message! Please go to your Honeydew dashboard to view it and respond. ${ACNE_APP_URL}`,
    PhoneNumber:
      (careCoordinator.phone && trimPhoneNumber(careCoordinator.phone)) || "",
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "Honeydew",
      },
    },
  };
  logInfo("SMS message query", smsMessageParams);

  await smsPublisher.publish(smsMessageParams).promise();
  logInfo("Care coordinator notified successfully");
};
