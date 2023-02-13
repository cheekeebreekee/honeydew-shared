"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qualifyUserByReferralId = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("src/constants");
const logger_1 = require("src/utils/logger");
async function qualifyUserByReferralId(referralId) {
    (0, logger_1.logInfo)("Update user in Referral Factory by referral ID", {
        referralId,
    });
    const user = await axios_1.default.put(`${constants_1.ENV.REFERRAL_FACTORY_BASE_URL}/users/${referralId}`, { qualified: 1 }, { headers: { Authorization: `Bearer ${constants_1.ENV.REFERRAL_FACTORY_API_KEY}` } });
    (0, logger_1.logInfo)("User found", user.data);
    return user;
}
exports.qualifyUserByReferralId = qualifyUserByReferralId;
//# sourceMappingURL=qualify-user-by-referral-id.js.map