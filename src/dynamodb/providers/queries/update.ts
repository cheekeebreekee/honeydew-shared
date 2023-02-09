import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { Provider } from "../../../../../types/Provider";
import { logInfo } from "../../../../../utils/logger";

export default ({
  id,
  firstName,
  lastName,
  phone,
  title,
}: Provider): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.PROVIDERS_TABLE,
    Key: {
      id,
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
      ":FIRST_NAME": firstName,
      ":LAST_NAME": lastName,
      ":PHONE": phone,
      ":TITLE": title,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
