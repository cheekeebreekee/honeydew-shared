import { DynamoDB } from "aws-sdk";
import { DynamoDBService } from "../../../";
import { Provider, CareCoordinator, EnrollmentCoordinator } from "../../../../types/Employee";
import { logError, logInfo } from "../../../../utils/logger";

const dynamoDb = new DynamoDB.DocumentClient();

export const update = (tableName: string) => async (employeePartial: Partial<Provider | CareCoordinator | EnrollmentCoordinator>) => {
  logInfo("Updating employee in DB", employeePartial);

  if (!employeePartial.id) {
    const message = "No employee ID found in partial";
    logError(message);
    throw new Error(message);
  }

  const employee = await DynamoDBService.employees(tableName).get(
    employeePartial.id || ""
  );

  logInfo("Employee to update", employee);

  const updatedEmployee: Provider | CareCoordinator | EnrollmentCoordinator = {
    ...employee,
    ...employeePartial,
  };

  logInfo("Updated employee data", updatedEmployee);

  const query = {
    TableName: tableName,
    Key: {
      id: updatedEmployee.id,
    },
    UpdateExpression:
      "set #firstName=:FIRST_NAME, #lastName=:LAST_NAME, #phone=:PHONE, #title=:TITLE",
    ExpressionAttributeNames: {
      "#firstName": "firstName",
      "#lastName": "lastName",
      "#phone": "phone",
      "#title": "title",
    },
    ExpressionAttributeValues: {
      ":FIRST_NAME": updatedEmployee.firstName,
      ":LAST_NAME": updatedEmployee.lastName,
      ":PHONE": updatedEmployee.phone,
      ":TITLE": updatedEmployee.title,
    },
    ReturnValues: "ALL_NEW",
  };

  logInfo("Update employee query", query);

  const { Attributes } = await dynamoDb
    .update(query)
    .promise();

  return Attributes as Provider | CareCoordinator | EnrollmentCoordinator;
};
