import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { Patient } from "../../../../types/Patient";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

export const appointmentConfirmationReply = async (patient: Patient) => {
  logInfo(
    "Sending SMS reply message to patient about appointment confirmation",
    {
      patient,
    }
  );
  const smsMessageParams = {
    Message: `Thank you! Your appointment is confirmed. See you soon`,
    PhoneNumber: (patient.phone && trimPhoneNumber(patient.phone)) || "",
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "Honeydew",
      },
    },
  };
  logInfo("SMS message query", smsMessageParams);

  await smsPublisher.publish(smsMessageParams).promise();
  logInfo("Patient notified successfully");
};
