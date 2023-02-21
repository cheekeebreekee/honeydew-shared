import { DynamoDB } from "aws-sdk";
import { EnrollmentCoordinator } from "src/types/EnrollmentCoordinator";
import { ENV } from "../../../shared/constants";
import { logInfo } from "../../../utils/logger";

export default ({
  id,
  firstName,
  lastName,
  phone,
}: EnrollmentCoordinator): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.ENROLLMENT_COORDINATORS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #firstName=:FIRST_NAME, #lastName=:LAST_NAME, #phone=:PHONE",
    ExpressionAttributeNames: {
      "#firstName": "firstName",
      "#lastName": "lastName",
      "#phone": "phone",
    },
    ExpressionAttributeValues: {
      ":FIRST_NAME": firstName,
      ":LAST_NAME": lastName,
      ":PHONE": phone,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
