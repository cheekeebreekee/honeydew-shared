"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTime = exports.getByPatientId = exports.create = exports.get = void 0;
var get_1 = require("./methods/get");
Object.defineProperty(exports, "get", { enumerable: true, get: function () { return get_1.get; } });
var create_1 = require("./methods/create");
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return create_1.create; } });
var get_by_patient_id_1 = require("./methods/get-by-patient-id");
Object.defineProperty(exports, "getByPatientId", { enumerable: true, get: function () { return get_by_patient_id_1.getByPatientId; } });
var update_time_1 = require("./methods/update-time");
Object.defineProperty(exports, "updateTime", { enumerable: true, get: function () { return update_time_1.updateTime; } });
//# sourceMappingURL=index.js.map