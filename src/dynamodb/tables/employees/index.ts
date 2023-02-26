import { get } from "./methods/get";
import { getAll } from "./methods/get-all";
import { create } from "./methods/create";
import { update } from "./methods/update";
import { remove } from "./methods/delete";

export const employees = (tableName: string) => ({
  get: get(tableName),
  getAll: getAll(tableName),
  create: create(tableName),
  update: update(tableName),
  delete: remove(tableName),
});
