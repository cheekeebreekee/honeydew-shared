import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { CareCoordinator } from "../../../../types/CareCoordinator";
import { Patient } from "../../../../types/Patient";
import { getDatePretty } from "../../../../utils/get-date-pretty";
import { getPatientInitials } from "../../../../utils/get-patient-initials";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

export const appointmentToDecline = async (
  careCoordinator: CareCoordinator,
  patient: Patient
) => {
  const { firstName, lastName, phone } = careCoordinator;
  logInfo(
    "Sending SMS message to care coordinator about appointment to decline",
    {
      careCoordinator,
    }
  );
  const smsMessageParams = {
    Message: `Dear ${firstName} ${lastName}.\nPatient ${getPatientInitials(
      patient
    )} (DOB ${
      patient.basicInfo.birthdate
    }) wants to cancel an appointment at ${getDatePretty(
      patient.appointments[0].start_time
    )}. \nPatient's phone number: ${patient.phone}`,
    PhoneNumber: (phone && trimPhoneNumber(phone)) || "",
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "Honeydew",
      },
    },
  };

  logInfo("SMS message query", smsMessageParams);

  // await smsPublisher.publish(smsMessageParams).promise();
  logInfo("SMS message disabled");
  // logInfo("Care coordinator notified successfully");
};
