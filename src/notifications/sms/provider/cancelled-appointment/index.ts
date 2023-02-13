import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { Patient } from "../../../../types/Patient";
import { Provider } from "../../../../types/Provider";
import { getDatePretty } from "../../../../utils/get-date-pretty";
import { getPatientInitials } from "../../../../utils/get-patient-initials";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

export const cancelledAppointment = async (
  provider: Provider,
  patient: Patient
) => {
  logInfo("Sending SMS message to provider about cancelled appointment", {
    provider,
    patient,
  });
  const { firstName, lastName, phone } = provider;
  const smsMessageParams = {
    Message: `Dear ${firstName} ${lastName}. \nAn appointment at ${getDatePretty(
      patient.appointments[0].start_time
    )} was cancelled for patient ${getPatientInitials(patient)} (DOB ${
      patient.basicInfo.birthdate
    }).`,
    PhoneNumber: (phone && trimPhoneNumber(phone)) || "",
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "Honeydew",
      },
    },
  };

  logInfo("SMS message query", smsMessageParams);

  await smsPublisher.publish(smsMessageParams).promise();

  logInfo("Provider notified succesfully");
};
