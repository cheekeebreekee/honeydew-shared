"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (id, status) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id,
        },
        UpdateExpression: "set #notifiedAboutUpcomingAppointment=:NOTIFIED",
        ExpressionAttributeNames: {
            "#notifiedAboutUpcomingAppointment": "notifiedAboutUpcomingAppointment",
        },
        ExpressionAttributeValues: {
            ":NOTIFIED": status,
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-upcoming-appointment-notification-status.js.map