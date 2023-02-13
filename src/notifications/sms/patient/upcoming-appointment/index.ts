import { Pinpoint } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { Patient } from "../../../../types/Patient";
import { getDatePretty } from "../../../../utils/get-date-pretty";
import { logInfo, logWarn } from "../../../../utils/logger";

const pinpoint = new Pinpoint();

export const upcomingAppointment = async (patients: Patient[]) => {
  logInfo("Sending SMS notifications to patients about upcoming appointment", {
    patients,
  });
  if (!patients.length) {
    logWarn("There is nobody to notify. Skip");
    return;
  }

  const params: Pinpoint.SendMessagesRequest = {
    ApplicationId: "ffe1d2061f8b4784a8269ff690842c7c",
    MessageRequest: {
      Addresses: {},
      MessageConfiguration: {
        SMSMessage: {
          Body: "Hey! You will have an appointment soon. \n\nPlease, reply to this message with 'yes' or 'y' if you confirm your participation. Otherwise, reply with 'no' or 'n' to reschedule your appointment",
          MessageType: "PROMOTIONAL",
          OriginationNumber: "+18337391508",
          SenderId: "Honeydew",
        },
      },
    },
  };

  const addressesToSend: Pinpoint.MapOfAddressConfiguration = {};

  patients.forEach((patient) => {
    if (!patient.phone) return;

    addressesToSend[trimPhoneNumber(patient.phone)] = {
      ChannelType: "SMS",
      BodyOverride: `Hey! You have a virtual appointment at ${getDatePretty(
        patient.appointments[0].start_time
      )} with a licensed Honeydew dermatology provider. \n\nPlease reply to "Yes" or "Y" to this message to confirm your participation. Otherwise, reply with "No" or "N" to cancel or reschedule your appointment.`,
    };
  });

  params.MessageRequest.Addresses = addressesToSend;

  logInfo("SMS message query", params);
  logInfo("Count of patients to notify", { count: patients.length });
  await pinpoint.sendMessages(params).promise();
  logInfo("Patients notified successfully");
};
