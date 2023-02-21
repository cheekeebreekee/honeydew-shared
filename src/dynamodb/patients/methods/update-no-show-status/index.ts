import { DynamoDB } from "aws-sdk";
import { Patient } from "src/types/Patient";
import { logInfo } from "../../../../utils/logger";
import updateNoShowStatusQuery from "../../queries/update-no-show-status";

const dynamoDb = new DynamoDB.DocumentClient();

export const updateNoShowStatus = async (id: string, status: boolean) => {
  logInfo("Updating patient's NoShow status in DB", { id, status });
  const { Attributes } = await dynamoDb.update(updateNoShowStatusQuery(id, status)).promise();
  logInfo("Patient has been updated successfully");
  return Attributes as Patient;
};
