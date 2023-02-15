import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { ACNE_APP_URL } from "../../../../shared/constants";
import { Patient } from "../../../../types/Patient";
import { arePhoneNumbersEqual } from "../../../../utils/are-phone-number-equal";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

const getQuery = (phone: string) => ({
  Message: `Good news! Your provider reviewed your follow-up visit and submitted a response. To view it, please go to your Honeydew dashboard. If you have any questions, don't hesitate to contact your care team via chat. ${ACNE_APP_URL}`,
  PhoneNumber: trimPhoneNumber(phone) || "",
  MessageAttributes: {
    "AWS.SNS.SMS.SenderID": {
      DataType: "String",
      StringValue: "Honeydew",
    },
  },
});

export const newFollowUpNotes = async (patient: Patient) => {
  logInfo("Sending SMS message to patient about new follow-up notes", {
    patient,
  });
  const queries = [getQuery(patient.phone)];
  logInfo("SMS message query", queries[0]);

  if (
    patient.basicInfo.parentsPhone &&
    !arePhoneNumbersEqual(patient.phone, patient.basicInfo.parentsPhone)
  ) {
    logInfo("Need to also notify parents");
    queries.push(getQuery(patient.basicInfo.parentsPhone));
    logInfo("SMS message query for parents", queries[1]);
  }

  await Promise.all(
    queries.map((query) => smsPublisher.publish(query).promise())
  );
  logInfo("Patient notified successfully");
};
