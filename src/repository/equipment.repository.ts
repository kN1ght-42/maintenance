import data from "../data/data.json" with { type: "json" };
import type { Equipment, equipmentType } from "../interfaces/interface.js";

export const createEquipment = (newEquipment: Equipment) => {
  data.equipments.push(newEquipment);

  return newEquipment;
};

export const getAllEquipments = () => {
  return data.equipments;
};

export const findEquipmentById = (id: string) => {
  return data.equipments.find((equipment) => equipment.id === id);
};

export const findIndex = (id: string) => {
  return data.equipments.findIndex((equipment) => equipment.id === id);
};

export const updateEquipmentById = (
  index: number,
  updatedEquipment: Partial<Omit<Equipment, "id">>,
): Equipment => {
  const oldEquipment = data.equipments[index];

  if (!oldEquipment) {
    throw new Error("Equipment not found");
  }

  const newEquipment: Equipment = {
    id: oldEquipment.id,
    name: oldEquipment.name,
    type: oldEquipment.type,
    serialNumber: oldEquipment.serialNumber,
    location: oldEquipment.location,
    status: oldEquipment.status,
    installedAt: oldEquipment.installedAt,
    ...updatedEquipment,
  };

  data.equipments[index] = newEquipment;

  return newEquipment;
};

export const getRequestsByEquipment = (id: string) => {
  return data.requests.filter((request) => request.equipmentId === id);
};

export const deleteEquipmentById = (index: number) => {
  data.equipments.splice(index, 1);
};
