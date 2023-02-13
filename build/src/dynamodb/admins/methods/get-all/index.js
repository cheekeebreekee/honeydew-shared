"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("../../../../constants");
const logger_1 = require("../../../../utils/logger");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const getAll = async () => {
    (0, logger_1.logInfo)("Getting all admins from DB");
    const { Items } = await dynamoDb
        .scan({ TableName: constants_1.ENV.ADMIBS_TABLE })
        .promise();
    if (Items) {
        (0, logger_1.logInfo)("Admins found", {
            count: Items.length,
        });
        return Items;
    }
    (0, logger_1.logWarn)("No admins found");
    return [];
};
exports.getAll = getAll;
//# sourceMappingURL=index.js.map