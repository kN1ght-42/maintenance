import type { Request, Response, NextFunction } from "express";
import {
  create,
  deleteById,
  getAll,
  getById,
  getWeatherById,
  idGenerator,
  updateById,
} from "../services/equipment.service.js";
import type { EquipmentQuery } from "../interfaces/interface.js";

export const createEquipment = (req: Request, res: Response) => {
  const { name, type, serialNumber, location, status, installedAt } = req.body;

  const newEquipment = {
    id: idGenerator(),
    name,
    type,
    serialNumber,
    location,
    status,
    installedAt,
  };

  const equipment = create(newEquipment);

  return res.status(201).json(equipment);
};

export const getAllEquipments = (req: Request, res: Response) => {
  const {
    type,
    status,
    page = "1",
    limit = "10",
    sortBy = "name",
    order = "asc",
  } = req.query;

  const query: EquipmentQuery = {
    page: Number(page),
    limit: Number(limit),
    sortBy: sortBy as EquipmentQuery["sortBy"],
    order: order as EquipmentQuery["order"],
  };

  if (type !== undefined) {
    query.type = type as string;
  }

  if (status !== undefined) {
    query.status = status as string;
  }

  const result = getAll(query);

  return res.json(result);
};

export const getEquipment = (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;

  const equipment = getById(id);

  return res.json(equipment);
};

export const updateEquipment = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;

  const updatedEquipment = req.body;

  updateById(id, updatedEquipment);
  return res.status(204).send();
};

export const deleteEquipment = (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const id = req.params.id;

  deleteById(id);
  return res.status(204).send();
};

export const getEquipmentWeather = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const weather = await getWeatherById(id);

    return res.json(weather);
  } catch (error) {
    next(error);
  }
};
