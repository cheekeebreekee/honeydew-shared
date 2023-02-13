import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { Patient } from "../../../../types/Patient";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

export const appointmentCancellationReply = async (patient: Patient) => {
  logInfo(
    "Sending SMS reply message to patient about rescheduling an appointment",
    {
      patient,
    }
  );
  const smsMessageParams = {
    Message: `Okay! Thanks for letting us know. Here is a link to reschedule your appointment: https://calendly.com/reschedulings/${patient.calendly_invitee_id}`,
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
