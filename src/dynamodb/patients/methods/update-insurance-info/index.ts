import { DynamoDB } from "aws-sdk";
import { Patient } from "src/types/Patient";
import { InsurancceInfoPayload } from "../../../../../../types/Payload";
import { logInfo } from "../../../../../../utils/logger";
import updateInsuranceInfoQuery from "../../queries/update-insurance-info";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateInsuranceInfo = async (
  id: string,
  insuranceInfo: InsurancceInfoPayload
) => {
  logInfo("Updating insurance info of the patient in DB", {
    id,
    insuranceInfo,
  });
  const { Attributes } = await dynamoDb
    .update(updateInsuranceInfoQuery(id, insuranceInfo))
    .promise();
  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
