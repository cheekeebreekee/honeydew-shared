import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { ACNE_APP_URL } from "../../../../constants";
import { Administrator } from "../../../../types/Administrator";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

export const newMessageInChat = async (admin: Administrator) => {
  logInfo("Sending SMS message to administrator about new message in chat", {
    admin,
  });
  const smsMessageParams = {
    Message: `You have a new chat message! Please go to your Honeydew dashboard to view it and respond. ${ACNE_APP_URL}`,
    PhoneNumber: (admin.phone && trimPhoneNumber(admin.phone)) || "",
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "Honeydew",
      },
    },
  };

  logInfo("SMS message query", smsMessageParams);

  await smsPublisher.publish(smsMessageParams).promise();
  logInfo("Administrator notified successfully");
};
