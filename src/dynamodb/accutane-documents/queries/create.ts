import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { AccutaneDocument } from "../../../types/AccutaneDocument";
import { logInfo } from "../../../utils/logger";

export default (
  accutaneDocument: AccutaneDocument
): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_DOCUMENTS_TABLE,
    Item: accutaneDocument,
  };
  logInfo("DynamoDB query", query);
  return query;
};
