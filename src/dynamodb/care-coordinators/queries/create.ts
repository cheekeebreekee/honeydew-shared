import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../shared/constants";
import { CareCoordinator } from "../../../types/CareCoordinator";
import { logInfo } from "../../../utils/logger";

export default (
  careCoordinator: CareCoordinator
): DynamoDB.DocumentClient.PutItemInput => {
  const query = {
    TableName: ENV.CARE_COORDINATORS_TABLE,
    Item: careCoordinator,
  };
  logInfo("DynamoDB query", query);
  return query;
};
