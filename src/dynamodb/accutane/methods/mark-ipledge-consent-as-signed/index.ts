import { DynamoDB } from "aws-sdk";
import { Accutane } from "src/types/Accutane";
import { logInfo } from "../../../../utils/logger";
import markIpledgeConsentAsSignedQuery from "../../queries/mark-ipledge-consent-as-signed";

const dynamoDb = new DynamoDB.DocumentClient();

export const markIpledgeConsentAsSigned = async (accutaneId: string) => {
  logInfo("Marking iPledge consent as signed", { accutaneId });

  const { Attributes } = await dynamoDb
    .update(markIpledgeConsentAsSignedQuery(accutaneId))
    .promise();

  logInfo("IPledge consent was successfully marked as signed", Attributes);
  return Attributes as Accutane;
};
