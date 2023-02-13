"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.logWarn = exports.logInfo = void 0;
const createMessage = (msg, additionalInfo) => `${msg} ${additionalInfo ? JSON.stringify(additionalInfo, null, 2) : ""}`;
const logInfo = (msg, additionalInfo) => {
    console.log(createMessage(msg, additionalInfo));
};
exports.logInfo = logInfo;
const logWarn = (msg, additionalInfo) => {
    console.warn(createMessage(msg, additionalInfo));
};
exports.logWarn = logWarn;
const logError = (msg, additionalInfo) => {
    console.error(msg, additionalInfo);
};
exports.logError = logError;
//# sourceMappingURL=logger.js.map