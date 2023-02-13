"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIpledgeInviteId = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const add_ipledge_invite_id_1 = __importDefault(require("../../queries/add-ipledge-invite-id"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const addIpledgeInviteId = async (accutaneId, inviteId) => {
    (0, logger_1.logInfo)("Adding IPledge invite ID", { inviteId });
    const { Attributes } = await dynamoDb
        .update((0, add_ipledge_invite_id_1.default)(accutaneId, inviteId))
        .promise();
    (0, logger_1.logInfo)("IPledge invite ID was successfully added to accutane record", Attributes);
    return Attributes;
};
exports.addIpledgeInviteId = addIpledgeInviteId;
//# sourceMappingURL=index.js.map