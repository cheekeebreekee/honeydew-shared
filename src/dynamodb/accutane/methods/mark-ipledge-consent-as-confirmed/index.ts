import { DynamoDB } from "aws-sdk";
import { Accutane } from "src/types/Accutane";
import { logInfo } from "../../../../utils/logger";
import markIpledgeConsentAsConfirmedQuery from "../../queries/mark-ipledge-consent-as-confirmed";

const dynamoDb = new DynamoDB.DocumentClient();

export const markIpledgeConsentAsConfirmed = async (accutaneId: string) => {
  logInfo("Marking iPledge consent as confirmed", { accutaneId });

  const { Attributes } = await dynamoDb
    .update(markIpledgeConsentAsConfirmedQuery(accutaneId))
    .promise();

  logInfo("IPledge consent was successfully marked as confirmed", Attributes);
  return Attributes as Accutane;
};
