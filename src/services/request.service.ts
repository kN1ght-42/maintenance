import type {
  MaintenanceRequest,
  RequestQuery,
} from "../interfaces/interface.js";
import { findEquipmentById } from "../repository/equipment.repository.js";
import {
  createRequest,
  deleteRequestById,
  findIndex,
  findRequestById,
  getAllRequests,
  getRequestsByEquipment,
  updateRequestById,
  updateRequestStatusById,
} from "../repository/request.repository.js";
import { appError } from "../utils/appError.js";

export const createCurrentDate = () => {
  return new Date().toISOString();
};

export const getByEquipmentId = (id: string) => {
  const equipment = findEquipmentById(id);

  if (!equipment) {
    throw appError(404, "NOT_FOUND", "Оборудование не найденo");
  }

  return getRequestsByEquipment(id);
};

export const getAll = (query: RequestQuery) => {
  let requests = getAllRequests();

  if (query.priority) {
    requests = requests.filter(
      (request) => request.priority === query.priority,
    );
  }

  if (query.status) {
    requests = requests.filter((request) => request.status === query.status);
  }

  if (query.equipmentId) {
    requests = requests.filter(
      (request) => request.equipmentId === query.equipmentId,
    );
  }

  if (query.plannedFrom) {
    requests = requests.filter(
      (request) =>
        request.plannedAt !== undefined &&
        new Date(request.plannedAt) >= new Date(query.plannedFrom!),
    );
  }

  if (query.plannedTo) {
    requests = requests.filter(
      (request) =>
        request.plannedAt !== undefined &&
        new Date(request.plannedAt) <= new Date(query.plannedTo!),
    );
  }

  const total = requests.length;

  requests.sort((a, b) => {
    const valueA = a[query.sortBy];
    const valueB = b[query.sortBy];

    if (valueA === undefined && valueB === undefined) {
      return 0;
    }

    if (valueA === undefined) {
      return 1;
    }

    if (valueB === undefined) {
      return -1;
    }

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

  const data = requests.slice(start, end);

  return {
    data,
    meta: {
      total,
      page: query.page,
      limit: query.limit,
    },
  };
};

export const create = (request: MaintenanceRequest) => {
  return createRequest(request);
};

export const getById = (id: string) => {
  const request = findRequestById(id);

  if (!request) {
    throw appError(404, "NOT_FOUND", "Запрос не найден");
  }

  return request;
};

export const updateById = (
  id: string,
  updatedRequest: Partial<Omit<MaintenanceRequest, "id">>,
) => {
  const requestIndex = findIndex(id);

  if (requestIndex === -1) {
    throw appError(404, "NOT_FOUND", "Запрос не найден");
  }

  return updateRequestById(requestIndex, updatedRequest);
};

export const updateStatusById = (id: string, status: string) => {
  const requestIndex = findIndex(id);

  if (requestIndex === -1) {
    throw appError(404, "NOT_FOUND", "Запрос не найден");
  }

  const currentStatus = findRequestById(id)?.status;

  switch (status) {
    case "new":
      throw appError(
        409,
        "CONFLICT",
        "Текущий статус не может быть изменен на новый",
      );
    case "in_progress":
      if (currentStatus !== "new") {
        throw appError(
          409,
          "CONFLICT",
          "Текущий статус не может быть изменен на новый",
        );
      }
      break;

    case "done":
      if (currentStatus !== "in_progress") {
        throw appError(
          409,
          "CONFLICT",
          "Текущий статус не может быть изменен на новый",
        );
      }
      break;

    case "rejected":
      if (currentStatus !== "new" && currentStatus !== "in_progress") {
        throw appError(
          409,
          "CONFLICT",
          "Текущий статус не может быть изменен на новый",
        );
      }
      break;
  }

  return updateRequestStatusById(requestIndex, status);
};

export const deleteById = (id: string) => {
  let requestIndex = findIndex(id);

  if (requestIndex === -1) {
    throw appError(404, "NOT_FOUND", "Запрос не найден");
  }

  return deleteRequestById(requestIndex);
};
