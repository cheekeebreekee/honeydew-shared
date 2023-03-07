import { getByPatientId } from "./get-by-patient-id";
import { addHistoryRecord } from "./add-history-record";
import { create } from "./create";
import { get } from "./get";
import { remove } from "./delete";

export const appointments = {
  getByPatientId,
  addHistoryRecord,
  get,
  create,
  remove,
};
