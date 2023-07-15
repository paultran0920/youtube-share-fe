export const logInfo = (...args: any[]) => {
  const [message, ...rest] = args;
  console.info(message, ...rest);
};

export const logError = (...args: any[]) => {
  const [message, ...rest] = args;
  console.error(message, ...rest);
};

export const logWarn = (...args: any[]) => {
  const [message, ...rest] = args;
  console.error(message, ...rest);
};

export const logDebug = (...args: any[]) => {
  const [message, ...rest] = args;
  console.debug(message, ...rest);
};
