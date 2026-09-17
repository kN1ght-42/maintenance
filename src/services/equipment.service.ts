import { randomUUID } from "node:crypto";
import {
  createEquipment,
  deleteEquipmentById,
  findEquipmentById,
  findIndex,
  getAllEquipments,
  getRequestsByEquipment,
  updateEquipmentById,
} from "../repository/equipment.repository.js";
import type { Equipment, Request } from "../interfaces/interface.js";

export const idGenerator = () => {
  const id = randomUUID();

  return id;
};

export const create = (equipment: Equipment) => {
  return createEquipment(equipment);
};

export const getAll = () => {
  return getAllEquipments();
};

export const getById = (id: string) => {
  const equipment = findEquipmentById(id);

  if (!equipment) {
    throw new Error("Equipment not found");
  }

  return equipment;
};

export const updateById = (
  id: string,
  updatedEquipment: Partial<Omit<Equipment, "id">>,
) => {
  let equipmentIndex = findIndex(id);

  if (equipmentIndex === -1) {
    throw new Error("Equipment not found");
  }

  return updateEquipmentById(equipmentIndex, updatedEquipment);
};

export const deleteById = (id: string) => {
  let equipmentIndex = findIndex(id);

  if (equipmentIndex === -1) {
    throw new Error("Equipment not found");
  }

  const requests = getRequestsByEquipment(id);

  const isOpenedRequests = requests.some(
    (request: Request) =>
      request.status === "new" || request.status === "in_progress",
  );

  if (isOpenedRequests) {
    throw new Error("Equipment can't be deleted");
  }

  return deleteEquipmentById(equipmentIndex);
};
