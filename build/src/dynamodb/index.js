"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamoDBService = void 0;
const patients = __importStar(require("./patients"));
const providers = __importStar(require("./providers"));
const careCoordinators = __importStar(require("./care-coordinators"));
const medicine = __importStar(require("./medicine"));
const treatmentPlans = __importStar(require("./treatment-plans"));
const unsupportedPatients = __importStar(require("./unsupported-patients"));
const enrollmentCoordinators = __importStar(require("./enrollment-coordinators"));
const accutane = __importStar(require("./accutane"));
const accutaneNotifications = __importStar(require("./accutane-notifications"));
const accutaneDocuments = __importStar(require("./accutane-documents"));
const accutaneTasks = __importStar(require("./accutane-tasks"));
const admins = __importStar(require("./admins"));
exports.DynamoDBService = {
    patients,
    providers,
    careCoordinators,
    medicine,
    treatmentPlans,
    unsupportedPatients,
    enrollmentCoordinators,
    accutane,
    accutaneNotifications,
    accutaneDocuments,
    accutaneTasks,
    admins,
};
//# sourceMappingURL=index.js.map