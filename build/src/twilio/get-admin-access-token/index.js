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
exports.getAdminAccessToken = void 0;
const AccessToken_1 = __importStar(require("twilio/lib/jwt/AccessToken"));
const constants_1 = require("../../constants");
const logger_1 = require("../../utils/logger");
const getAdminAccessToken = (identity) => {
    (0, logger_1.logInfo)("Get admin access token for identity", { identity });
    const chatGrant = new AccessToken_1.ChatGrant({
        serviceSid: constants_1.ENV.TWILIO_CHAT_SERVICE_SID,
    });
    const token = new AccessToken_1.default(constants_1.ENV.TWILIO_ACCOUNT_SID, constants_1.ENV.TWILIO_API_KEY, constants_1.ENV.TWILIO_API_SECRET, { identity });
    token.addGrant(chatGrant);
    const jwt = token.toJwt();
    (0, logger_1.logInfo)("Token generated", { token: jwt });
    return jwt;
};
exports.getAdminAccessToken = getAdminAccessToken;
//# sourceMappingURL=index.js.map