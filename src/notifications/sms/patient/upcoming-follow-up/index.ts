import { SNS } from "aws-sdk";
import { trimPhoneNumber } from "../../../../utils/trim-phone-number";
import { ACNE_APP_URL } from "../../../../constants";
import { Patient } from "../../../../types/Patient";
import { arePhoneNumbersEqual } from "../../../../utils/are-phone-number-equal";
import { logInfo } from "../../../../utils/logger";

const smsPublisher = new SNS({ apiVersion: "2010-03-31" });

const getQuery = (phone: string) => ({
  Message: `Honeydew Reminder: It's time to follow-up with your provider! Please go to your Honeydew dashboard and press 'Start Follow-Up Visit' to share some updates and photos of your skin with your provider. ${ACNE_APP_URL}`,
  PhoneNumber: trimPhoneNumber(phone) || "",
  MessageAttributes: {
    "AWS.SNS.SMS.SenderID": {
      DataType: "String",
      StringValue: "Honeydew",
    },
  },
});

export const upcomingFollowUp = async (patient: Patient) => {
  logInfo("Sending SMS notification to patient about upcoming follow-up", {
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
