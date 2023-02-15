/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  Handler,
  SQSEvent,
} from "aws-lambda";
import { config } from "src/shared/config-manager";
import { logError, logInfo } from "./logger";
import { HttpResponse } from "./http-response";

export const enhancedApiHandler =
  <T = APIGatewayProxyEventV2>(handler: Handler<T>): Handler =>
  async (event, context, callback) => {
    logInfo("Event received", event);

    let response: APIGatewayProxyResultV2;
    try {
      await config.initConfig();
      response = await handler(event, context, callback);
    } catch (error: any) {
      logError("Lambda exit with error", error);
      response = HttpResponse.serverError(error as any);
    }

    logInfo("Lambda exit", response as any);
    return response;
  };

export const enhancedWebhookHandler =
  <T = APIGatewayProxyEventV2>(handler: Handler<T>): Handler =>
  async (event, context, callback) => {
    logInfo("Webhook event received", event);

    let response: APIGatewayProxyResultV2;
    try {
      await config.initConfig();
      response = await handler(event, context, callback);
      logInfo("Lambda exit", { response });
    } catch (error: any) {
      logError("Lambda exit with error", error);
    }

    // Respond with only success to prevent webhooks detach
    return HttpResponse.success();
  };

export const enhancedSQSHandler =
  <T = SQSEvent>(handler: Handler<T>): Handler =>
  async (event, context, callback) => {
    logInfo("Event received", event);

    try {
      await config.initConfig();
      await handler(event, context, callback);
    } catch (error: any) {
      logError("Lambda exit with error", error);
      throw error;
    }

    logInfo("Lambda exit");
  };

export const enhancedLambdaConsoleHandler =
  <T = APIGatewayProxyEventV2>(handler: Handler<T>): Handler =>
  async (event, context, callback) => {
    logInfo("Event received", event);

    let response: APIGatewayProxyResultV2;
    try {
      await config.initConfig();
      response = await handler(event, context, callback);
    } catch (error: any) {
      logError("Lambda exit with error", error);
      response = HttpResponse.serverError(error as any);
    }

    logInfo("Lambda exit", response as any);
    return response;
  };
