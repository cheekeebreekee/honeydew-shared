import { DynamoDB } from "aws-sdk";
import { Accutane } from "src/types/Accutane";
import { logInfo } from "../../../../../../utils/logger";
import resetIpledgeInviteIdQuery from "../../queries/reset-ipledge-invite-id";

const dynamoDb = new DynamoDB.DocumentClient();

export const resetIpledgeInviteId = async (accutaneId: string) => {
  const { Attributes } = await dynamoDb
    .update(resetIpledgeInviteIdQuery(accutaneId))
    .promise();

  logInfo("IPledge invite ID was successfully reset", Attributes);
  return Attributes as Accutane;
};
