"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByReferralId = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("src/constants");
const logger_1 = require("src/utils/logger");
async function getUserByReferralId(referralId) {
    (0, logger_1.logInfo)("Getting Referral Factory user by referral ID", {
        referralId,
    });
    const user = await axios_1.default.get(`${constants_1.ENV.REFERRAL_FACTORY_BASE_URL}/users/${referralId}`, { headers: { Authorization: `Bearer ${constants_1.ENV.REFERRAL_FACTORY_API_KEY}` } });
    (0, logger_1.logInfo)("User found", user.data);
    return user;
}
exports.getUserByReferralId = getUserByReferralId;
//# sourceMappingURL=get-user-by-referral-id.js.map