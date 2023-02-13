import { SES } from "aws-sdk";
import { Patient } from "../../../../../types/Patient";
import { logInfo } from "../../../../../utils/logger";
import { membershipConfirmationMultiTemplate } from "../../../templates/patient-membership-confirmation-multi";

const sesPublisher = new SES({ region: "us-east-1" });

export const membershipConfirmationMulti = async (
  patient: Patient,
  subscriptionType: string,
  amount: number,
  discount: number
) => {
  logInfo(
    "Sending email message to patient about membership confirmaion (multi account)",
    {
      patient,
      subscriptionType,
      amount,
      discount,
    }
  );
  const queries = [
    membershipConfirmationMultiTemplate(
      patient.email,
      subscriptionType,
      amount,
      discount
    ),
  ];

  if (patient.basicInfo.parentsPhone) {
    logInfo("Send email also to parents");
    queries.push(
      membershipConfirmationMultiTemplate(
        patient.basicInfo.parentsPhone,
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
