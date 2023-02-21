import { DynamoDB } from "aws-sdk";
import { Accutane, IPledgeConsent } from "src/types/Accutane";
import { DynamoDBService } from "../../../index";
import { logError, logInfo } from "../../../../utils/logger";
import addIpledgeConsentQuery from "../../queries/add-ipledge-consent";

const dynamoDb = new DynamoDB.DocumentClient();

export const addIpledgeConsent = async (
  id: string,
  iPledgeConsent: Partial<IPledgeConsent>,
  {
    enrollmentDate,
    enrollmentDateOffset,
    lastConfirmationDate,
    nextConfirmationDate,
  }: Partial<Accutane>
) => {
  logInfo("Adding IPledge consent", iPledgeConsent);

  const accutane = await DynamoDBService.accutane.get(id);

  if (!accutane.id) {
    const message = "Accutane record not found in database";
    logError(message);
    throw new Error(message);
  }

  logInfo("Adding IPledge consent info to accutane record", accutane);

  const { Attributes } = await dynamoDb
    .update(
      addIpledgeConsentQuery(id, iPledgeConsent, {
        enrollmentDate,
        enrollmentDateOffset,
        lastConfirmationDate,
        nextConfirmationDate,
      })
    )
    .promise();

  logInfo("IPledge consent was successfully added to accutane record", Attributes);
  return Attributes as Accutane;
};
