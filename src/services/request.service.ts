import type { MaintenanceRequest } from "../interfaces/interface.js";
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
  const request = findRequestById(id);

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
  const requestIndex = findIndex(id);

  if (requestIndex === -1) {
    throw new Error("Request not found");
  }

  const currentStatus = findRequestById(id)?.status;

  switch (status) {
    case "new":
      throw new Error("This status can't be switched on current");

    case "in_progress":
      if (currentStatus !== "new") {
        throw new Error("This status can't be switched on current");
      }
      break;

    case "done":
      if (currentStatus !== "in_progress") {
        throw new Error("This status can't be switched on current");
      }
      break;

    case "rejected":
      if (currentStatus !== "new" && currentStatus !== "in_progress") {
        throw new Error("This status can't be switched on current");
      }
      break;
  }

  return updateRequestStatusById(requestIndex, status);
};

export const deleteById = (id: string) => {
  let requestIndex = findIndex(id);

  if (requestIndex === -1) {
    throw new Error("Request not found");
  }

  return deleteRequestById(requestIndex);
};
