import type { Request, Response } from "express";
import {
  create,
  createCurrentDate,
  getAll,
  getByEquipmentId,
  getById,
  updateById,
  updateStatusById,
} from "../services/request.service.js";
import { idGenerator } from "../services/equipment.service.js";
import type { MaintenanceRequest } from "../interfaces/interface.js";

export const getRequestsByEquipment = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const equipmentId = req.params.id;

  const requests = getByEquipmentId(equipmentId);

  return res.json(requests);
};

export const getAllRequests = (req: Request, res: Response) => {
  const requests = getAll();
  return res.json(requests);
};

export const createRequest = (req: Request, res: Response) => {
  const { equipmentId, title, description, priority, status, plannedAt } =
    req.body;

  const newRequest: MaintenanceRequest = {
    id: idGenerator(),
    equipmentId,
    title,
    description,
    priority,
    status: status ? status : "new",
    plannedAt,
    createdAt: createCurrentDate(),
    updatedAt: createCurrentDate(),
  };

  const request = create(newRequest);
  return res.status(201).json(request);
};

export const getRequest = (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;

  const request = getById(id);

  return res.json(request);
};

export const updateRequest = (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;

  const updatedRequest = req.body;

  updateById(id, updatedRequest);
  return res.status(204).send();
};

export const updateStatus = (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;

  const status = req.body.status;

  updateStatusById(id, status);

  return res.status(204).send();
};
