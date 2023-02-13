import { DynamoDB } from "aws-sdk";
import { ENV } from "../../../constants";
import { logInfo } from "../../../utils/logger";

export default (
  id: string,
  comment: string,
  patientId: string,
  signedBy: { id: string; name: string; role: string; createdAt: string }
) => {
  logInfo("Query input", { id, comment, patientId });
  const query = {
    TableName: ENV.ACCUTANE_DOCUMENTS_TABLE,
    Key: {
      id,
      compositeKey: `${patientId}_${id}`,
    },
    UpdateExpression:
      "set #comment=:COMMENT, #signedBy.#id = :ID, #signedBy.#name = :NAME, #signedBy.#role = :ROLE, #signedBy.#createdAt = :CREATED_AT",
    ExpressionAttributeNames: {
      "#comment": "comment",
      "#signedBy": "signedBy",
      "#id": "id",
      "#name": "name",
      "#role": "role",
      "#createdAt": "createdAt",
    },
    ExpressionAttributeValues: {
      ":COMMENT": comment,
      ":NAME": signedBy.name,
      ":ROLE": signedBy.role,
      ":ID": signedBy.id,
      ":CREATED_AT": new Date().toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };
  logInfo("DynamoDB query", query);
  return query;
};
