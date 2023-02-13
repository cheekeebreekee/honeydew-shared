"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const aws_sdk_1 = require("aws-sdk");
const constants_1 = require("../../../../constants");
const logger_1 = require("../../../../utils/logger");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
async function scanWithPagination(startKey) {
    const { Items, LastEvaluatedKey } = await dynamoDb
        .scan({ TableName: constants_1.ENV.USERS_TABLE, ExclusiveStartKey: startKey })
        .promise();
    if (!Items)
        return undefined;
    if (!LastEvaluatedKey)
        return Items;
    return [...Items, ...((await scanWithPagination(LastEvaluatedKey)) || [])];
}
const getAll = async (archived) => {
    (0, logger_1.logInfo)("Getting all patients from DB", { archived });
    const Items = await scanWithPagination();
    if (Items) {
        (0, logger_1.logInfo)("Found patients count", { count: Items.length });
        if (!archived) {
            const filteredPatientsList = Items.filter((patient) => !patient.archived);
            (0, logger_1.logInfo)("Filtering out archived patients", {
                filtered: Items.length - filteredPatientsList.length,
                remaining: filteredPatientsList.length,
            });
            return filteredPatientsList;
        }
        return Items;
    }
    (0, logger_1.logWarn)("No patients found in DB");
    return [];
};
exports.getAll = getAll;
//# sourceMappingURL=index.js.map