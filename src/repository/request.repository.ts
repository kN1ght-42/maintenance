import data from "../data/data.json" with { type: "json" };
import type { MaintenanceRequest, Data } from "../interfaces/interface.js";
import { createCurrentDate } from "../services/request.service.js";

const typedData = data as Data;

export const findEquipmentById = (id: string) => {
  return typedData.requests.find((request) => request.id === id);
};

export const findIndex = (id: string) => {
  return typedData.requests.findIndex((request) => request.id === id);
};

export const getRequestsByEquipment = (id: string) => {
  return typedData.requests.filter((request) => request.equipmentId === id);
};

export const getAllRequests = () => {
  return typedData.requests;
};

export const createRequest = (newEquipment: MaintenanceRequest) => {
  typedData.requests.push(newEquipment);

  return newEquipment;
};

export const updateRequestById = (
  index: number,
  updatedRequest: Partial<
    Pick<MaintenanceRequest, "title" | "description" | "priority" | "plannedAt">
  >,
): MaintenanceRequest => {
  const oldRequest = data.requests[index];

  if (!oldRequest) {
    throw new Error("Request not found");
  }

  const newRequest: MaintenanceRequest = {
    ...oldRequest,
    ...updatedRequest,
    updatedAt: createCurrentDate(),
  };

  typedData.requests[index] = newRequest;

  return newRequest;
};

export const updateRequestStatusById = (index: number, status: string) => {
  let oldRequest = data.requests[index];

  if (!oldRequest) {
    throw new Error("Request not found");
  }

  const newRequest: MaintenanceRequest = {
    ...oldRequest,
    status: status,
  };

  typedData.requests[index] = newRequest;

  return newRequest;
};
