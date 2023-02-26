import { DynamoDB } from "aws-sdk";
import { Provider, CareCoordinator, EnrollmentCoordinator } from "../../../../types/Employee";
import { logInfo } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const create = (tableName: string) => async (employee: Provider | CareCoordinator | EnrollmentCoordinator) => {
  logInfo(`Create ${employee.type} employee in DB`, employee);

  const query = {
    TableName: tableName,
    Item: employee,
  };

  logInfo("Create employee query", query);

  await dynamoDb.put(query).promise();

  logInfo("Provider has been created successfully");
};
