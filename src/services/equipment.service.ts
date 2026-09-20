import { randomUUID } from "node:crypto";
import {
  createEquipment,
  deleteEquipmentById,
  findEquipmentById,
  findIndex,
  getAllEquipments,
  updateEquipmentById,
} from "../repository/equipment.repository.js";
import type {
  Equipment,
  EquipmentQuery,
  MaintenanceRequest,
} from "../interfaces/interface.js";
import { getRequestsByEquipment } from "../repository/request.repository.js";
import { appError } from "../utils/appError.js";
import { getWeather } from "./weather.service.js";

export const idGenerator = () => {
  const id = randomUUID();

  return id;
};

export const create = (equipment: Equipment) => {
  const equipments = getAllEquipments();

  const isDuplicate = equipments.some(
    (item) => item.serialNumber === equipment.serialNumber,
  );

  if (isDuplicate) {
    throw appError(
      409,
      "CONFLICT",
      "Оборудование с таким серийным номером уже существует",
    );
  }

  return createEquipment(equipment);
};

export const getAll = (query: EquipmentQuery) => {
  let equipments = getAllEquipments();

  if (query.type) {
    equipments = equipments.filter(
      (equipment) => equipment.type === query.type,
    );
  }

  if (query.status) {
    equipments = equipments.filter(
      (equipment) => equipment.status === query.status,
    );
  }

  const total = equipments.length;

  equipments.sort((a, b) => {
    const valueA = a[query.sortBy];
    const valueB = b[query.sortBy];

    if (valueA < valueB) {
      return query.order === "asc" ? -1 : 1;
    }

    if (valueA > valueB) {
      return query.order === "asc" ? 1 : -1;
    }

    return 0;
  });

  const start = (query.page - 1) * query.limit;
  const end = start + query.limit;

  const data = equipments.slice(start, end);

  return {
    data,
    meta: {
      total,
      page: query.page,
      limit: query.limit,
    },
  };
};

export const getById = (id: string) => {
  const equipment = findEquipmentById(id);

  if (!equipment) {
    throw appError(404, "NOT_FOUND", "Оборудование не найдено");
  }

  return equipment;
};

export const updateById = (
  id: string,
  updatedEquipment: Partial<Omit<Equipment, "id">>,
) => {
  let equipmentIndex = findIndex(id);

  if (equipmentIndex === -1) {
    throw appError(404, "NOT_FOUND", "Оборудование не найдено");
  }

  return updateEquipmentById(equipmentIndex, updatedEquipment);
};

export const deleteById = (id: string) => {
  let equipmentIndex = findIndex(id);

  if (equipmentIndex === -1) {
    throw appError(404, "NOT_FOUND", "Оборудование не найдено");
  }

  const requests = getRequestsByEquipment(id);

  const isOpenedRequests = requests.some(
    (request: MaintenanceRequest) =>
      request.status === "new" || request.status === "in_progress",
  );

  if (isOpenedRequests) {
    throw appError(409, "CONFLICT", "Оборудование не может быть удалено");
  }

  return deleteEquipmentById(equipmentIndex);
};

export const getWeatherById = async (id: string) => {
  const equipment = findEquipmentById(id);

  if (!equipment) {
    throw appError(404, "NOT_FOUND", "Оборудование не найдено");
  }

  const weather = await getWeather(
    equipment.location.lat,
    equipment.location.lon,
  );

  return {
    equipmentId: equipment.id,
    location: equipment.location,
    weather,
  };
};
