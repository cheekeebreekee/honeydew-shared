"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, { primaryForm, secondaryForm, createdAt, completed }) => {
    const query = {
        TableName: constants_1.ENV.ACCUTANE_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #birthControl.#primaryForm=:PRIMARY_FORM, #birthControl.#secondaryForm=:SECONDARY_FORM, #birthControl.#completed=:COMPLETED, #birthControl.#createdAt=:CREATED_AT",
        ExpressionAttributeNames: {
            "#birthControl": "birthControl",
            "#createdAt": "createdAt",
            "#primaryForm": "primaryForm",
            "#secondaryForm": "secondaryForm",
            "#completed": "completed",
        },
        ExpressionAttributeValues: {
            ":PRIMARY_FORM": primaryForm,
            ":SECONDARY_FORM": secondaryForm,
            ":CREATED_AT": createdAt,
            ":COMPLETED": completed,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=add-birth-control.js.map