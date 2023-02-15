import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { ENV } from "../../../../shared/constants";
import { Patient } from "../../../../types/Patient";
import { arePhoneNumbersEqual } from "../../../../utils/are-phone-number-equal";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

const skippedAppointmentNotificationQuery = (
  patient: Patient,
  phone: string
): SNS.PublishInput => ({
  Message: `Hey! It looks like you missed your initial consultation with your Honeydew dermatology provider, which was scheduled for ${patient.appointments[0].invitee_start_time_pretty}.\nNo worries, we let you reschedule once more for free before requiring a membership signup. Use this link to reschedule your initial consultation: ${ENV.CALENDLY_APPOINTMENT_URL}?utm_source=${patient.id}`,
  PhoneNumber: trimPhoneNumber(phone) || "",
  MessageAttributes: {
    "AWS.SNS.SMS.SenderID": {
      DataType: "String",
      StringValue: "Honeydew",
    },
  },
});

export const skippedAppointment = async (patient: Patient) => {
  logInfo("Sending SMS message to patient about skipped appointment", {
    patient,
  });
  const queries = [skippedAppointmentNotificationQuery(patient, patient.phone)];
  logInfo("SMS message query", queries[0]);

  if (
    patient.basicInfo.parentsPhone &&
    !arePhoneNumbersEqual(patient.phone, patient.basicInfo.parentsPhone)
  ) {
    logInfo("Need to also notify parents");
    queries.push(
      skippedAppointmentNotificationQuery(
        patient,
        patient.basicInfo.parentsPhone
      )
    );
    logInfo("SMS message query for parents", queries[1]);
  }

  await Promise.all(
    queries.map((query) => smsPublisher.publish(query).promise())
  );
  logInfo("Patient notified successfully");
};
