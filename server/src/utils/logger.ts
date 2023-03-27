/* eslint-disable @typescript-eslint/no-explicit-any */
const info = (...params: any[]) => {
  if (process.env.NODE_ENV !== "test") {
    console.log("\x1b[32m", ...params);
  }
};

const error = (...params: any[]) => {
  if (process.env.NODE_ENV !== "test") {
    console.error("\x1b[31m", ...params);
  }
};

export default { info, error } as const;
