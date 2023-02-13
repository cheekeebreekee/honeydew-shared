import { SES } from "aws-sdk";
import { Patient } from "../../../../../types/Patient";
import { logInfo } from "../../../../../utils/logger";
import { membershipConfirmationTemplate } from "../../../templates/patient-membership-confirmation";

const sesPublisher = new SES({ region: "us-east-1" });

export const membershipConfirmation = async (
  patient: Patient,
  subscriptionType: string,
  amount: number,
  discount: number
) => {
  logInfo("Sending email to patient about membership confirmation", {
    patient,
    subscriptionType,
    amount,
    discount,
  });
  const queries = [
    membershipConfirmationTemplate(
      patient.email,
      patient.email,
      subscriptionType,
      amount,
      discount
    ),
  ];

  if (patient.basicInfo.parentsEmail) {
    logInfo("Sending email also to parents");
    queries.push(
      membershipConfirmationTemplate(
        patient.basicInfo.parentsEmail,
        patient.email,
        subscriptionType,
        amount,
        discount
      )
    );
  }

  await Promise.all(
    queries.map((query) => sesPublisher.sendEmail(query).promise())
  );
  logInfo("Email message sent successfully");
};
