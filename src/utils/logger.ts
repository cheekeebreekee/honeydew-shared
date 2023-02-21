/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

const createMessage = (msg: string, additionalInfo?: any): string =>
  `${msg} ${additionalInfo ? JSON.stringify(additionalInfo, null, 2) : ""}`;

export const logInfo = (msg: string, additionalInfo?: any): void => {
  console.log(createMessage(msg, additionalInfo));
};

export const logWarn = (msg: string, additionalInfo?: any): void => {
  console.warn(createMessage(msg, additionalInfo));
};

export const logError = (msg: string, additionalInfo?: any): void => {
  console.error(msg, additionalInfo);
};

export const logDebug = (msg: string, additionalInfo?: any): void => {
  if (process.env.DEBUG) console.debug(createMessage(msg, additionalInfo));
};
