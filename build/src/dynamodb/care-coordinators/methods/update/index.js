"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const aws_sdk_1 = require("aws-sdk");
const index_1 = require("../../../index");
const logger_1 = require("../../../../utils/logger");
const update_1 = __importDefault(require("../../queries/update"));
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
const update = async (careCoordinatorPartial) => {
    (0, logger_1.logInfo)("Updating care coordinator", careCoordinatorPartial);
    if (!careCoordinatorPartial.id) {
        const message = "Care Coordinator ID is not found in partial";
        (0, logger_1.logError)(message);
        throw new Error(message);
    }
    const careCoordinator = await index_1.DynamoDBService.careCoordinators.get(careCoordinatorPartial.id);
    (0, logger_1.logInfo)("Care coordinator to update", careCoordinator);
    const updatedCareCoordinator = {
        ...careCoordinator,
        ...careCoordinatorPartial,
    };
    (0, logger_1.logInfo)("Data to upate", updatedCareCoordinator);
    const { Attributes } = await dynamoDb
        .update((0, update_1.default)(updatedCareCoordinator))
        .promise();
    (0, logger_1.logInfo)("Care coordinator has been updated successfully");
    return Attributes;
};
exports.update = update;
//# sourceMappingURL=index.js.map