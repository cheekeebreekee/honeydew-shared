import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  patientId: string
): DynamoDB.DocumentClient.GetItemInput => {
  const query = {
    TableName: ENV.ACCUTANE_DOCUMENTS_TABLE,
    Key: {
      id,
      compositeKey: `${patientId}_${id}`,
    },
  };
  logInfo("DynamoDB query", query);
  return query;
};
