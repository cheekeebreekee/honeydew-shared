"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByCode = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("src/constants");
const logger_1 = require("src/utils/logger");
async function getUserByCode(code) {
    (0, logger_1.logInfo)("Getting Referral Factory user by code ID", {
        code,
    });
    const user = await axios_1.default.get(`${constants_1.ENV.REFERRAL_FACTORY_BASE_URL}/users?filters[0][field]=code&filters[0][value]=${code}`, { headers: { Authorization: `Bearer ${constants_1.ENV.REFERRAL_FACTORY_API_KEY}` } });
    (0, logger_1.logInfo)("User found", user.data);
    return user.data.data;
}
exports.getUserByCode = getUserByCode;
//# sourceMappingURL=get-user-by-code.js.map