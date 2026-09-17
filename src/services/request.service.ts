import type { MaintenanceRequest } from "../interfaces/interface.js";
import { findEquipmentById } from "../repository/equipment.repository.js";
import {
  createRequest,
  findIndex,
  getAllRequests,
  getRequestsByEquipment,
  updateRequestById,
  updateRequestStatusById,
} from "../repository/request.repository.js";

export const createCurrentDate = () => {
  return new Date().toISOString();
};

export const getByEquipmentId = (id: string) => {
  const equipment = findEquipmentById(id);

  if (!equipment) {
    throw new Error("Equipment is not found");
  }

  return getRequestsByEquipment(id);
};

export const getAll = () => {
  const requests = getAllRequests();

  return requests;
};

export const create = (request: MaintenanceRequest) => {
  return createRequest(request);
};

export const getById = (id: string) => {
  const request = findEquipmentById(id);

  if (!request) {
    throw new Error("Request not found");
  }

  return request;
};

export const updateById = (
  id: string,
  updatedRequest: Partial<Omit<MaintenanceRequest, "id">>,
) => {
  let requestIndex = findIndex(id);

  if (requestIndex === -1) {
    throw new Error("Request not found");
  }

  return updateRequestById(requestIndex, updatedRequest);
};

export const updateStatusById = (id: string, status: string) => {
  let requestIndex = findIndex(id);

  if (requestIndex === -1) {
    throw new Error("Request not found");
  }

  return updateRequestStatusById(requestIndex, status);
};
