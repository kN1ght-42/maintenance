import { randomUUID } from "node:crypto";

export const idGenerator = () => {
  const id = randomUUID();

  return id;
};
