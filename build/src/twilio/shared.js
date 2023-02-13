"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twilioClient = void 0;
const twilio_1 = __importDefault(require("twilio"));
const constants_1 = require("../constants");
exports.twilioClient = (0, twilio_1.default)(constants_1.ENV.TWILIO_ACCOUNT_SID, constants_1.ENV.TWILIO_AUTH_TOKEN);
//# sourceMappingURL=shared.js.map