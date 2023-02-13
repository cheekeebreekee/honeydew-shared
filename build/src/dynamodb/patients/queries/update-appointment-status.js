"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../../constants");
const logger_1 = require("../../../utils/logger");
exports.default = (user, status, cancelReason) => {
    const query = {
        TableName: constants_1.ENV.USERS_TABLE,
        Key: {
            id: user.id,
        },
        UpdateExpression: "set #appointmentStatus=:APPOINTMENT_STATUS",
        ExpressionAttributeNames: {
            "#appointmentStatus": "appointmentStatus",
        },
        ExpressionAttributeValues: {
            ":APPOINTMENT_STATUS": [
                {
                    status,
                    timestamp: Date.now(),
                    reason: cancelReason || undefined,
                },
                ...(user.appointmentStatus || []),
            ],
        },
        ReturnValues: "ALL_NEW",
    };
    (0, logger_1.logInfo)("DynamoDB query", query);
    return query;
};
//# sourceMappingURL=update-appointment-status.js.map