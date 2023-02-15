import { DynamoDB } from "aws-sdk";
import { Key } from "aws-sdk/clients/dynamodb";
import { ENV } from "../../../../shared/constants";
import { Patient } from "../../../../types/Patient";
import { logInfo, logWarn } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

async function scanWithPagination(
  startKey?: Key
): Promise<DynamoDB.DocumentClient.ItemList | undefined> {
  const { Items, LastEvaluatedKey } = await dynamoDb
    .scan({ TableName: ENV.USERS_TABLE, ExclusiveStartKey: startKey })
    .promise();

  if (!Items) return undefined;
  if (!LastEvaluatedKey) return Items;

  return [...Items, ...((await scanWithPagination(LastEvaluatedKey)) || [])];
}

export const getAll = async (archived?: boolean): Promise<Patient[]> => {
  logInfo("Getting all patients from DB", { archived });
  const Items = await scanWithPagination();

  if (Items) {
    logInfo("Found patients count", { count: Items.length });
    if (!archived) {
      const filteredPatientsList = (Items as Patient[]).filter(
        (patient) => !patient.archived
      );
      logInfo("Filtering out archived patients", {
        filtered: Items.length - filteredPatientsList.length,
        remaining: filteredPatientsList.length,
      });
      return filteredPatientsList;
    }

    return Items as Patient[];
  }

  logWarn("No patients found in DB");
  return [];
};
