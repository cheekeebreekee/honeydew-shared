import { DynamoDB } from "aws-sdk";
import { Patient } from "../../../../types/Patient";
import { logInfo } from "../../../../utils/logger";
import archiveQuery from "../../queries/archive";

const dynamoDb = new DynamoDB.DocumentClient();

export const archive = async (id: string, state: boolean) => {
  logInfo("Changing archive status of the patient in DB", { id, state });
  const { Attributes } = await dynamoDb
    .update(archiveQuery(id, state))
    .promise();
  logInfo("Patient's 'archive' status has been changed successfully in DB");
  return Attributes as Patient;
};
