"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.addComment = exports.getAll = exports.create = exports.get = void 0;
var get_1 = require("./methods/get");
Object.defineProperty(exports, "get", { enumerable: true, get: function () { return get_1.get; } });
var create_1 = require("./methods/create");
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return create_1.create; } });
var get_all_1 = require("./methods/get-all");
Object.defineProperty(exports, "getAll", { enumerable: true, get: function () { return get_all_1.getAll; } });
var add_comment_1 = require("./methods/add-comment");
Object.defineProperty(exports, "addComment", { enumerable: true, get: function () { return add_comment_1.addComment; } });
var delete_1 = require("./methods/delete");
Object.defineProperty(exports, "deleteItem", { enumerable: true, get: function () { return delete_1.deleteItem; } });
//# sourceMappingURL=index.js.map