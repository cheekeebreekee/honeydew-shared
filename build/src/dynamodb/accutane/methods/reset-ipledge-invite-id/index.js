"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetIpledgeInviteId = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const reset_ipledge_invite_id_1 = __importDefault(require("../../queries/reset-ipledge-invite-id"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const resetIpledgeInviteId = async (accutaneId) => {
    const { Attributes } = await dynamoDb
        .update((0, reset_ipledge_invite_id_1.default)(accutaneId))
        .promise();
    (0, logger_1.logInfo)("IPledge invite ID was successfully reset", Attributes);
    return Attributes;
};
exports.resetIpledgeInviteId = resetIpledgeInviteId;
//# sourceMappingURL=index.js.map