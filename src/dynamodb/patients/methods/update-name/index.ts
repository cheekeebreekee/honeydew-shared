import { DynamoDB } from "aws-sdk";
import { Patient } from "src/types/Patient";
import { logInfo } from "../../../../utils/logger";
import updateNameQuery from "../../queries/update-name";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateName = async (id: string, name: string) => {
  logInfo("Updating patient's name in DB", { id, name });
  const { Attributes } = await dynamoDb
    .update(updateNameQuery(id, name))
    .promise();
  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
