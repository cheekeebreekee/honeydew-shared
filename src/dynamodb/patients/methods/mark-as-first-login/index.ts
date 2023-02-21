import { DynamoDB } from "aws-sdk";
import { Patient } from "../../../../types/Patient";
import { logInfo } from "../../../../utils/logger";
import markAsFirstLoginQuery from "../../queries/mark-as-first-login";

const dynamoDb = new DynamoDB.DocumentClient();

export const markAsFirstLogin = async (id: string) => {
  logInfo("Markin patient as first login in DB", { id });
  const { Attributes } = await dynamoDb.update(markAsFirstLoginQuery(id)).promise();
  logInfo("Patient has been marked as first login successfully in DB");
  return Attributes as Patient;
};
