import { DynamoDB } from "aws-sdk";
import { DynamoDBService } from "../../../..";
import { Provider } from "../../../../../../types/Provider";
import { logError, logInfo } from "../../../../../../utils/logger";
import updateProviderQuery from "../../queries/update";

const dynamoDb = new DynamoDB.DocumentClient();

export const update = async (providerPartial: Partial<Provider>) => {
  logInfo("Updating provider in DB", providerPartial);

  if (!providerPartial.id) {
    const message = "No provider ID found in partial";
    logError(message);
    throw new Error(message);
  }

  const provider = await DynamoDBService.providers.get(
    providerPartial.id || ""
  );

  logInfo("Provider to update", provider);

  const updatedProvider: Provider = {
    ...provider,
    ...providerPartial,
  };

  logInfo("Updated provider data", updatedProvider);
  const { Attributes } = await dynamoDb
    .update(updateProviderQuery(updatedProvider))
    .promise();
  return Attributes as Provider;
};
