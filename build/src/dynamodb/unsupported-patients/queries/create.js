"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (unsupportedPatient) => {
    const query = {
        TableName: constants_1.ENV.UNSUPPORTED_USERS_TABLE,
        Item: unsupportedPatient,
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=create.js.map