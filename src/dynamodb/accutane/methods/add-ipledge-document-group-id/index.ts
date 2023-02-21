import { DynamoDB } from "aws-sdk";
import { Accutane } from "../../../../types";
import { logInfo } from "../../../../utils/logger";
import addIpledgeDocumentGroupIdQuery from "../../queries/add-ipledge-document-group-id";

const dynamoDb = new DynamoDB.DocumentClient();

export const addIpledgeDocumentGroupId = async (accutaneId: string, documentGroupId: string) => {
  logInfo("Adding IPledge document group ID", { documentGroupId });

  const { Attributes } = await dynamoDb
    .update(addIpledgeDocumentGroupIdQuery(accutaneId, documentGroupId))
    .promise();

  logInfo("IPledge document group ID was successfully added to accutane record", Attributes);
  return Attributes as Accutane;
};
