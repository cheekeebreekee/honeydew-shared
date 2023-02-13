"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMomentDate = exports.getDatePretty = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.add(["America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0"]);
function getDatePretty(_date) {
    return (0, moment_timezone_1.default)(_date)
        .add(-1, "hour")
        .tz("America/New_York")
        .format("h:mma on dddd, MMMM Do");
}
exports.getDatePretty = getDatePretty;
function getMomentDate(_date) {
    return (0, moment_timezone_1.default)(_date).add(-1, "hour").tz("America/New_York");
}
exports.getMomentDate = getMomentDate;
//# sourceMappingURL=get-date-pretty.js.map