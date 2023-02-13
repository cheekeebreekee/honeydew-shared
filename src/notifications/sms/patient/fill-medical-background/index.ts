import { SNS } from "aws-sdk";
import { getMomentDate } from "src/utils/get-date-pretty";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { ACNE_APP_URL } from "../../../../constants";
import { Patient } from "../../../../types/Patient";
import { arePhoneNumbersEqual } from "../../../../utils/are-phone-number-equal";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

const fillMedicalBackgroundNotificationQuery = (
  appointmentDate: string,
  phone: string
): SNS.PublishInput => ({
  Message: `Honeydew Care:\n\nYour dermatology consultation is scheduled for ${getMomentDate(
    appointmentDate
  ).format(
    "MMMM Do, h:mm A"
  )}! We are still missing your answers to our skin and medical background questionnaire. Please login and submit them now: ${ACNE_APP_URL}/skin-survey\n\nYour clinician can't do a visit without these answers. Please submit them at least 3 hours before your visit to avoid cancellation.\n\nYour Honeydew clinician is excited to meet you soon!\n\nHave questions? Call us at 516-210-5600`,
  PhoneNumber: trimPhoneNumber(phone) || "",
  MessageAttributes: {
    "AWS.SNS.SMS.SenderID": {
      DataType: "String",
      StringValue: "Honeydew",
    },
  },
});

export const fillMedicalBackground = async (patient: Patient) => {
  logInfo("Sending SMS message to patient about filling medical background", {
    patient,
  });

  if (!patient.appointments) {
    logInfo("Patient still doesn't have an appointment. Skip");
    return;
  }

  if (!patient.phone) {
    logInfo("Patient doesn't have a phone number yet. Skip");
    return;
  }

  const queries = [
    fillMedicalBackgroundNotificationQuery(
      patient.appointments[0].start_time,
      patient.phone
    ),
  ];
  logInfo("SMS message query", queries[0]);

  if (
    patient.basicInfo.parentsPhone &&
    !arePhoneNumbersEqual(
      patient.appointments[0].start_time,
      patient.basicInfo.parentsPhone
    )
  ) {
    logInfo("Need to also notify parents");
    queries.push(
      fillMedicalBackgroundNotificationQuery(
        patient.id,
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
