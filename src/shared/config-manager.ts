import { SSM } from "@aws-sdk/client-ssm";
import { logDebug } from "../utils";

enum CONFIG_TYPES {
  SECRETS = "secrets",
  PARAMETERS = "parameters",
  SHARED = "shared",
}

class ConfigManager {
  store: {
    parameters: { [p: string]: string };
    secrets: { [p: string]: string };
    shared: { [p: string]: string };
  };

  ssm: SSM;

  constructor() {
    this.ssm = new SSM({});
    this.store = {
      parameters: {},
      secrets: {},
      shared: {},
    };
  }

  private async loadConfig(Name: string): Promise<{ [p: string]: string }> {
    logDebug("Loading SSM config", {
      Name,
    });
    const response = await this.ssm.getParameter({
      Name,
      WithDecryption: true,
    });

    if (!response.Parameter?.Value) {
      throw new Error(`Configuration with name ${Name} is not found`);
    }

    return JSON.parse(response.Parameter.Value);
  }

  async initConfig() {
    this.store = {
      parameters: await this.loadConfig(
        `/${process.env.BRAND}/${process.env.ENVIRONMENT}/${process.env.SERVICE}/${CONFIG_TYPES.PARAMETERS}`
      ),
      secrets: await this.loadConfig(
        `/${process.env.BRAND}/${process.env.ENVIRONMENT}/${process.env.SERVICE}/${CONFIG_TYPES.SECRETS}`
      ),
      shared: await this.loadConfig(
        `/${process.env.BRAND}/${process.env.ENVIRONMENT}/${CONFIG_TYPES.SHARED}`
      ),
    };
  }

  private getValue(type: CONFIG_TYPES, key: string) {
    if (!this.store[type][key]) {
      throw new Error(`Configuration property "${key}" is not found in ${type}`);
    }

    return this.store[type][key];
  }

  getSecretValue(key: string) {
    return this.getValue(CONFIG_TYPES.SECRETS, key);
  }

  getParameterValue(key: string) {
    return this.getValue(CONFIG_TYPES.PARAMETERS, key);
  }

  getSharedValue(key: string) {
    return this.getValue(CONFIG_TYPES.SHARED, key);
  }
}

export const config = new ConfigManager();
