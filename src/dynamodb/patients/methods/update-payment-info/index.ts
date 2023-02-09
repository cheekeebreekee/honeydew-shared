import { DynamoDB } from "aws-sdk";
import updatePaymentInfoQuery from "../../queries/update-payment-info";
import { logInfo } from "../../../../../../utils/logger";
import {
  Membership,
  Patient,
  PaymentInfo,
} from "../../../../../../types/Patient";
import { DynamoDBService } from "../../../..";

const dynamoDb = new DynamoDB.DocumentClient();

export const updatePaymentInfo = async (
  id: string,
  membership?: Membership | null,
  paymentInfo?: PaymentInfo | null
) => {
  logInfo("Updating patient's payment info in DB", {
    id,
    membership,
    paymentInfo,
  });
  const patient = await DynamoDBService.patients.get(id);

  logInfo("Patient to update", patient);

  const updatedMembership = {
    ...patient.membership,
    ...(membership || {}),
  };
  const updatedPaymentInfo = {
    ...patient.paymentInfo,
    ...(paymentInfo || {}),
  };

  logInfo("Updated membership and payment info data", {
    updatedMembership,
    updatedPaymentInfo,
  });

  const { Attributes } = await dynamoDb
    .update(updatePaymentInfoQuery(id, updatedMembership, updatedPaymentInfo))
    .promise();
  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
