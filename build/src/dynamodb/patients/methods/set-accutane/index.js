"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAccutane = void 0;
const aws_sdk_1 = require("aws-sdk");
const set_accutane_flag_1 = __importDefault(require("../../queries/set-accutane-flag"));
const get_1 = __importDefault(require("../../queries/get"));
const logger_1 = require("../../../../utils/logger");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const setAccutane = async (id, accutaneFlag) => {
    (0, logger_1.logInfo)("Setting accutane flag to patient in DB", { id, accutaneFlag });
    const { Item: patient } = await dynamoDb.get((0, get_1.default)(id)).promise();
    (0, logger_1.logInfo)("Patient to set accutane flag to", patient);
    const { Attributes } = await dynamoDb
        .update((0, set_accutane_flag_1.default)(id, accutaneFlag))
        .promise();
    (0, logger_1.logInfo)("Accutane flag has been set to patient in DB");
    return Attributes;
};
exports.setAccutane = setAccutane;
//# sourceMappingURL=index.js.map