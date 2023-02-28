import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { config } from "../../../shared";
import { Patient } from "../../../types";
import { logInfo, logWarn } from "../../../utils/logger";

const dynamoDb = new DynamoDB({});

export const getAll = async (): Promise<Patient[]> => {
  logInfo("Getting all patients from DB");

  const { Items } = await dynamoDb.scan({ TableName: config.getSharedValue("patientsTableName") });

  if (Items) {
    logInfo("Found patients count", { count: Items.length });
    return Items.map((it) => unmarshall(it)) as Patient[];
  }

  logWarn("No patients found in DB");
  return [];
};
