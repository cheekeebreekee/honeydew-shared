import { DynamoDB } from "aws-sdk";
import { Patient } from "src/types/Patient";
import { logInfo } from "../../../../../../utils/logger";
import updateMultiAccListQuery from "../../queries/update-multi-acc-list";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateMultiAccList = async (id: string, list: string[]) => {
  logInfo("Updating patient's multi account list in DB", { id, list });
  const { Attributes } = await dynamoDb
    .update(updateMultiAccListQuery(id, list))
    .promise();
  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
