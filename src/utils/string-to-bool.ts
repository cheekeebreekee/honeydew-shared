export function stringToBool(string: string | boolean | null) {
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
