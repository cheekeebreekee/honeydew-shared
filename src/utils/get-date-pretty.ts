import moment from "moment-timezone";

moment.tz.add(["America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0"]);

export function getDatePretty(_date: Date | string) {
  return moment(_date).tz("America/New_York").format("h:mma on dddd, MMMM Do");
}
