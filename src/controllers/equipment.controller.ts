import data from "../data/data.json" with { type: "json" };
import type { Request, Response } from "express";
import type { Equipment } from "../interfaces/interface.js";
import { idGenerator } from "../services/service.js";

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

  data.equipments.push(newEquipment);
};
