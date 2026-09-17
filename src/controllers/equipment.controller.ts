import data from "../data/data.json" with { type: "json" };
import type { Request, Response } from "express";
import {
  create,
  deleteById,
  getAll,
  getById,
  idGenerator,
  updateById,
} from "../services/equipment.service.js";

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
  const equipments = getAll();
  res.json(equipments);
};

export const getEquipment = (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;

  const equipment = getById(id);

  res.json(equipment);
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
