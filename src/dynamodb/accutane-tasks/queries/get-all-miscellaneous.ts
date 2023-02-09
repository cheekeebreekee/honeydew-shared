import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../../../constants";
import { logInfo } from "../../../../../utils/logger";

const generateFilterExpression = (
  employeeId: string,
  patientId?: string,
  documentId?: string
) => {
  if (employeeId && patientId && documentId)
    return `begins_with(compositeKey, :id)`;
  return `contains(compositeKey, :employeeId)`;
};

const generateFilterExpressionAttributeValue = (
  employeeId: string,
  patientId?: string,
  documentId?: string
) => {
  if (patientId && documentId)
    return {
      ":id": `${patientId}_${employeeId}_${documentId}`,
    };
  return {
    ":employeeId": employeeId,
  };
};

export default (
  employeeId: string,
  patientId?: string,
  documentId?: string
): DynamoDB.DocumentClient.QueryInput => {
  const query = {
    TableName: ENV.ACCUTANE_TASKS_TABLE,
    FilterExpression: generateFilterExpression(
      employeeId,
      patientId,
      documentId
    ),
    ExpressionAttributeValues: generateFilterExpressionAttributeValue(
      employeeId,
      patientId,
      documentId
    ),
  };
  logInfo("DynamoDB query", query);
  return query;
};
