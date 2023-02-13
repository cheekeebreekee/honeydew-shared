"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMiscellaneous = void 0;
const aws_sdk_1 = require("aws-sdk");
const logger_1 = require("../../../../utils/logger");
const get_all_miscellaneous_1 = __importDefault(require("../../queries/get-all-miscellaneous"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const getAllMiscellaneous = async (employeeId, patientId, documentId) => {
    (0, logger_1.logInfo)("Getting miscellaneos tasks from DB", {
        employeeId,
        patientId,
        documentId,
    });
    const { Items } = await dynamoDb
        .scan((0, get_all_miscellaneous_1.default)(employeeId, patientId, documentId))
        .promise();
    if (!(Items === null || Items === void 0 ? void 0 : Items.length)) {
        const message = `Miscellaneos tasks wasn't found`;
        (0, logger_1.logError)(message);
        return [];
    }
    (0, logger_1.logInfo)(`Miscellaneos tasks found`, Items);
    return Items;
};
exports.getAllMiscellaneous = getAllMiscellaneous;
//# sourceMappingURL=index.js.map