import { DynamoDB } from "aws-sdk";
import { Accutane } from "src/types/Accutane";
import { logInfo } from "../../../../utils/logger";
import addIpledgeInviteIdQuery from "../../queries/add-ipledge-invite-id";

const dynamoDb = new DynamoDB.DocumentClient();

export const addIpledgeInviteId = async (
  accutaneId: string,
  inviteId: string
) => {
  logInfo("Adding IPledge invite ID", { inviteId });

  const { Attributes } = await dynamoDb
    .update(addIpledgeInviteIdQuery(accutaneId, inviteId))
    .promise();

  logInfo(
    "IPledge invite ID was successfully added to accutane record",
    Attributes
  );
  return Attributes as Accutane;
};
