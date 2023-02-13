"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
const constants_1 = require("../constants");
const headers = {
    ...constants_1.DEFAULT_RESPONSE_HEADERS,
};
exports.HttpResponse = {
    badRequest: (data = {}) => ({
        statusCode: 400,
        body: JSON.stringify(data),
        headers,
    }),
    notFound: () => ({
        statusCode: 404,
        body: JSON.stringify({}),
        headers,
    }),
    noPermissions: (data = {}) => ({
        statusCode: 403,
        body: JSON.stringify(data),
        headers,
    }),
    success: (data = {}) => ({
        statusCode: 200,
        body: JSON.stringify(data),
        headers,
    }),
    noContent: (data = {}) => ({
        statusCode: 204,
        body: JSON.stringify(data),
        headers,
    }),
    serverError: (data = {}) => ({
        statusCode: 500,
        body: JSON.stringify(data),
        headers,
    }),
};
//# sourceMappingURL=http-response.js.map