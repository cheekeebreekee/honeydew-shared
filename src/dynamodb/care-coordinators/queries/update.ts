import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { CareCoordinator } from "../../../types/CareCoordinator";
import { logInfo } from "../../../utils/logger";

export default ({
  id,
  firstName,
  lastName,
  phone,
}: CareCoordinator): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.CARE_COORDINATORS_TABLE,
    Key: {
      id,
    },
    UpdateExpression:
      "set #firstName=:FIRST_NAME, #lastName=:LAST_NAME, #phone=:PHONE",
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
