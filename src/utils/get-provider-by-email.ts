import { DynamoDBService } from "../dynamodb";
import { logError } from "./logger";

export async function getProviderByEmail(email: string) {
  const providers = await DynamoDBService.providers.getAll();
  const selectedProvider = providers.find(
    (provider) => provider.email === email
  );

  if (!selectedProvider) {
    const message = `Cannot find provider by email "${email}"`;
    logError(message);
    throw new Error(message);
  }

  return selectedProvider;
}
