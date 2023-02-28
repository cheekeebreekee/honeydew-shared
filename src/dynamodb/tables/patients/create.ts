import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { config } from "../../../shared";
import { Patient } from "../../../types";
import { logInfo } from "../../../utils/logger";

const dynamoDb = new DynamoDB({});

export const create = () => async (patient: Patient) => {
  logInfo(`Create patient in DB`, patient);

  const query = {
    TableName: config.getSharedValue("patientsTableName"),
    Item: marshall(patient),
  };

  logInfo("Create patient query", query);

  await dynamoDb.putItem(query);

  logInfo("Patient has been created successfully");
};
