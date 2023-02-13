import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { ACNE_APP_URL } from "../../../../constants";
import { Patient } from "../../../../types/Patient";
import { Provider } from "../../../../types/Provider";
import { getPatientInitials } from "../../../../utils/get-patient-initials";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

export const newMessageInChat = async (
  patient: Patient,
  provider: Provider
) => {
  logInfo("Sending SMS message to provider about new message in chat", {
    patient,
    provider,
  });
  const { firstName, lastName } = provider;
  const smsMessageParams = {
    Message: `Honeydew Reminder: Dear ${firstName} ${lastName}. You have new message in chat. Patient - ${getPatientInitials(
      patient
    )}; Date of birth - ${patient.basicInfo.birthdate}.\n${ACNE_APP_URL}`,
    PhoneNumber: (provider.phone && trimPhoneNumber(provider.phone)) || "",
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
