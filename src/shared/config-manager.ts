import { SSM } from "@aws-sdk/client-ssm";
import { logDebug } from "../utils";

enum CONFIG_TYPES {
  SECRETS = "secrets",
  PARAMETERS = "parameters",
}

class ConfigManager {
  store: {
    parameters: { [p: string]: string };
    secrets: { [p: string]: string };
  };

  ssm: SSM;

  constructor() {
    this.ssm = new SSM({});
    this.store = {
      parameters: {},
      secrets: {},
    };
  }

  private async loadConfig(type: CONFIG_TYPES): Promise<{ [p: string]: string }> {
    const Name = `/${process.env.BRAND}/${process.env.ENVIRONMENT}/${process.env.SERVICE}/${type}`;
    logDebug("Loading SSM config", {
      Name,
    });
    const response = await this.ssm.getParameter({
      Name,
      WithDecryption: true,
    });

    if (!response.Parameter?.Value) {
      throw new Error(`Configuration with type ${type} is not found`);
    }

    return JSON.parse(response.Parameter.Value);
  }

  async initConfig() {
    this.store = {
      parameters: await this.loadConfig(CONFIG_TYPES.PARAMETERS),
      secrets: await this.loadConfig(CONFIG_TYPES.SECRETS),
    };
  }

  private getValue(type: CONFIG_TYPES, key: string) {
    if (!this.store[type][key]) {
      throw new Error(`Configuration property "${key}" is not found in ${type}`);
    }

    return this.store[type][key];
  }

  getSecretValue(key: string) {
    this.getValue(CONFIG_TYPES.SECRETS, key);
  }

  getParameterValue(key: string) {
    this.getValue(CONFIG_TYPES.PARAMETERS, key);
  }
}

export const config = new ConfigManager();
