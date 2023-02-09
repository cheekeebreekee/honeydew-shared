import { DynamoDB } from "aws-sdk";
import { Medicine } from "../../../../../../types/Medicine";
import { logInfo } from "../../../../../../utils/logger";
import createMedicineQuery from "../../queries/create";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = async (medicine: Medicine) => {
  logInfo("Creating medicine in DB", medicine);
  await dynamoDb.put(createMedicineQuery(medicine)).promise();
  logInfo("Medicine successfully created");
};
