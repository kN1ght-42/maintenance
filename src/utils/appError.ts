import type { ErrorDetail } from "../interfaces/interface.js";

export const appError = (
  statusCode: number,
  code: string,
  message: string,
  details?: ErrorDetail[],
) => {
  const error = new Error(message);

  Object.assign(error, {
    statusCode,
    code,
    details,
  });

  return error;
};
