import { APIGatewayProxyResultV2 } from "aws-lambda";
import { DEFAULT_RESPONSE_HEADERS } from "../shared/constants";

const headers = {
  ...DEFAULT_RESPONSE_HEADERS,
};

export const HttpResponse = {
  badRequest: <T>(data: T = {} as T): APIGatewayProxyResultV2 => ({
    statusCode: 400,
    body: JSON.stringify(data),
    headers,
  }),
  notFound: (): APIGatewayProxyResultV2 => ({
    statusCode: 404,
    body: JSON.stringify({}),
    headers,
  }),
  noPermissions: <T>(data: T = {} as T): APIGatewayProxyResultV2 => ({
    statusCode: 403,
    body: JSON.stringify(data),
    headers,
  }),
  success: <T>(data: T = {} as T): APIGatewayProxyResultV2 => ({
    statusCode: 200,
    body: JSON.stringify(data),
    headers,
  }),
  noContent: <T>(data: T = {} as T): APIGatewayProxyResultV2 => ({
    statusCode: 204,
    body: JSON.stringify(data),
    headers,
  }),
  serverError: <T>(data: T = {} as T): APIGatewayProxyResultV2 => ({
    statusCode: 500,
    body: JSON.stringify(data),
    headers,
  }),
};
