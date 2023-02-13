"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getAll = exports.get = void 0;
var get_1 = require("./methods/get");
Object.defineProperty(exports, "get", { enumerable: true, get: function () { return get_1.get; } });
var get_all_1 = require("./methods/get-all");
Object.defineProperty(exports, "getAll", { enumerable: true, get: function () { return get_all_1.getAll; } });
var create_1 = require("./methods/create");
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return create_1.create; } });
var update_1 = require("./methods/update");
Object.defineProperty(exports, "update", { enumerable: true, get: function () { return update_1.update; } });
var remove_1 = require("./methods/remove");
Object.defineProperty(exports, "remove", { enumerable: true, get: function () { return remove_1.remove; } });
//# sourceMappingURL=index.js.map