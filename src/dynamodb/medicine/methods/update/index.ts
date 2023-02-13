import { DynamoDB } from "aws-sdk";
import { DynamoDBService } from "../../../index";
import { Medicine } from "../../../../types/Medicine";
import { logInfo } from "../../../../utils/logger";
import updateMedicineQuery from "../../queries/update";

const dynamoDb = new DynamoDB.DocumentClient();

export const update = async (_medicine: Medicine) => {
  logInfo("Updating medicine in DB", _medicine);
  const medicine = await DynamoDBService.medicine.get(_medicine.id);
  logInfo("Medicine to update");
  const updatedMedicine = {
    ...medicine,
    ..._medicine,
  };
  logInfo("Updated medicine data");
  const { Attributes } = await dynamoDb
    .update(updateMedicineQuery(_medicine.id, updatedMedicine))
    .promise();
  logInfo("Medicine updated successfully");
  return Attributes as Medicine;
};
