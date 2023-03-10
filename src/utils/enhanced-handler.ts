/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
  AppSyncResolverHandler,
  Handler,
  SQSEvent,
} from "aws-lambda";
import { logError, logInfo } from "./logger";
import { HttpResponse } from "./http-response";
import { config } from "../shared";

export const enhancedAppSyncHandler =
  <TArgument, TResult>(handler: AppSyncResolverHandler<TArgument, TResult>): Handler =>
  async (event, context, callback) => {
    logInfo("AppSync event received", event);

    let response;
    try {
      await config.initConfig();
      response = await handler(event, context, callback);
    } catch (e) {
      logError("Lambda exit with error", e);
      throw e;
    }

    return response;
  };

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
