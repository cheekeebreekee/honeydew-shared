"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTemporaryPassword = void 0;
const password_generator_1 = __importDefault(require("password-generator"));
const maxLength = 12;
const minLength = 8;
const generateTemporaryPassword = () => {
    const randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
    const password = (0, password_generator_1.default)(randomLength, false, /[A-Za-z0-9]/);
    return password;
};
exports.generateTemporaryPassword = generateTemporaryPassword;
//# sourceMappingURL=generate-password.js.map