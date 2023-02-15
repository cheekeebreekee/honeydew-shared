import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { ACNE_APP_URL } from "../../../../shared/constants";
import { Provider } from "../../../../types/Provider";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

export const treatmentPlansToDo = async (provider: Provider) => {
  logInfo("Sending SMS message to provider about treatment plans to do", {
    provider,
  });
  const { phone } = provider;
  const smsMessageParams = {
    Message: `Honeydew Reminder: You have an outstanding treatment plan that needs submission. Patients can't sign up until you submit their initial treatment plan. ${ACNE_APP_URL}`,
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
