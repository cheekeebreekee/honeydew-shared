import { DynamoDB } from "aws-sdk";
import { CareCoordinator, Provider, EnrollmentCoordinator, Administrator } from "../../../../types/Employee";
import { logError, logInfo } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const get = (tableName: string) => async (id: string): Promise<Provider | CareCoordinator | EnrollmentCoordinator | Administrator> => {
  logInfo("Getting employee from DB", { id });

  const query = {
    TableName: tableName,
    Key: {
      id,
    },
  };

  logInfo("Getting employee from DB query", query);

  const { Item } = await dynamoDb.get(query).promise();

  if (!Item) {
    const message = `Employee with ID ${id} is not found`;
    logError(message);
    throw new Error(message);
  }

  logInfo("Employee found", Item);

  return Item as Provider | CareCoordinator | EnrollmentCoordinator;
};
