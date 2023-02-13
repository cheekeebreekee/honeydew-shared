"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("../../../../constants");
const logger_1 = require("../../../../utils/logger");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const getAll = async () => {
    (0, logger_1.logInfo)("Getting all medicine from DB");
    const { Items } = await dynamoDb
        .scan({ TableName: constants_1.ENV.MEDICINE_TABLE })
        .promise();
    (0, logger_1.logInfo)("Items found count", {
        count: Items === null || Items === void 0 ? void 0 : Items.length,
    });
    return Items;
};
exports.getAll = getAll;
//# sourceMappingURL=index.js.map