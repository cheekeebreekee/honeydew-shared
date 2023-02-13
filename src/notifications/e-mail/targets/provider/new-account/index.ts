import { SES } from "aws-sdk";
import { Provider } from "../../../../../types/Provider";
import { logInfo } from "../../../../../utils/logger";
import { DynamoDBService } from "../../../../../dynamodb";
import { newProviderAccountEmailTemplate } from "../../../templates/new-provider-account";

const sesPublisher = new SES({ region: "us-east-1" });

export const newAccount = async (
  payload: Provider | string,
  password: string
) => {
  logInfo("Sending email message to provider about new account");
  const provider =
    typeof payload === "string"
      ? await DynamoDBService.providers.get(payload)
      : payload;
  logInfo("Provider to notify", provider);

  const query = newProviderAccountEmailTemplate(provider, password);

  await sesPublisher.sendEmail(query).promise();
  logInfo("Provider notified successfully");
};
