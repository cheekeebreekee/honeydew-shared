"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToBool = void 0;
function stringToBool(string) {
    let result = null;
    switch (string) {
        case "Yes":
        case true:
            result = true;
            break;
        case "No":
        case false:
            result = false;
            break;
        default:
            break;
    }
    return result;
}
exports.stringToBool = stringToBool;
//# sourceMappingURL=string-to-bool.js.map