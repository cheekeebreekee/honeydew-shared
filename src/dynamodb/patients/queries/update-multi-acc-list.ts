import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

export default (
  id: string,
  list: string[]
): DynamoDB.DocumentClient.UpdateItemInput => {
  const query = {
    TableName: ENV.USERS_TABLE,
    Key: {
      id,
    },
    UpdateExpression: "set #multiAccList=:MULTIACC_LIST",
    ExpressionAttributeNames: {
      "#multiAccList": "multiAccList",
    },
    ExpressionAttributeValues: {
      ":MULTIACC_LIST": list,
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
