import type { NextFunction, Request, Response } from "express";
import {
  isValidInstalledAt,
  isValidName,
  isValidStatus,
  isValidType,
} from "../utils/validators.js";

export const validateCreateEquipment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, type, serialNumber, location, status, installedAt } = req.body;

  if (!isValidName(name)) {
    return res.status(400).json({
      error: "Invalid name",
    });
  }

  if (!isValidType(type)) {
    return res.status(400).json({
      error: "Invalid equipment type",
    });
  }

  if (typeof serialNumber !== "string" || serialNumber.length === 0) {
    return res.status(400).json({
      error: "Invalid serialNumber",
    });
  }

  if (
    location === undefined ||
    location === null ||
    typeof location !== "object" ||
    typeof location.lat !== "number" ||
    typeof location.lon !== "number"
  ) {
    return res.status(400).json({
      error: "Invalid location",
    });
  }

  if (!isValidStatus(status)) {
    return res.status(400).json({
      error: "Invalid equipment status",
    });
  }

  if (!isValidInstalledAt(installedAt)) {
    return res.status(400).json({
      error: "Invalid installedAt",
    });
  }

  next();
};

export const validateEquipmentQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { type, status, page, limit, sortBy, order } = req.query;

  const allowedTypes = ["turbine", "inverter", "sensor", "substation"];

  const allowedStatuses = [
    "operational",
    "maintenance",
    "fault",
    "decommissioned",
  ];

  const allowedSortFields = ["name", "type", "status", "installedAt"];

  const allowedOrders = ["asc", "desc"];

  if (type && !allowedTypes.includes(type as string)) {
    return res.status(400).json({
      error: "Invalid type filter",
    });
  }

  if (status && !allowedStatuses.includes(status as string)) {
    return res.status(400).json({
      error: "Invalid status filter",
    });
  }

  if (page !== undefined) {
    const pageNumber = Number(page);

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      return res.status(400).json({
        error: "Invalid page",
      });
    }
  }

  if (limit !== undefined) {
    const limitNumber = Number(limit);

    if (!Number.isInteger(limitNumber) || limitNumber < 1) {
      return res.status(400).json({
        error: "Invalid limit",
      });
    }
  }

  if (sortBy && !allowedSortFields.includes(sortBy as string)) {
    return res.status(400).json({
      error: "Invalid sortBy",
    });
  }

  if (order && !allowedOrders.includes(order as string)) {
    return res.status(400).json({
      error: "Invalid order",
    });
  }

  next();
};

export const validateUpdateEquipment = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, type, serialNumber, location, status, installedAt } = req.body;

  if (name !== undefined && !isValidName(name)) {
    return res.status(400).json({
      error: "Invalid name",
    });
  }

  if (type !== undefined && !isValidType(type)) {
    return res.status(400).json({
      error: "Invalid equipment type",
    });
  }

  if (
    serialNumber !== undefined &&
    (typeof serialNumber !== "string" || serialNumber.length === 0)
  ) {
    return res.status(400).json({
      error: "Invalid serialNumber",
    });
  }

  if (
    location !== undefined &&
    (location === null ||
      typeof location !== "object" ||
      typeof location.lat !== "number" ||
      typeof location.lon !== "number")
  ) {
    return res.status(400).json({
      error: "Invalid location",
    });
  }

  if (status !== undefined && !isValidStatus(status)) {
    return res.status(400).json({
      error: "Invalid equipment status",
    });
  }

  if (installedAt !== undefined && !isValidInstalledAt(installedAt)) {
    return res.status(400).json({
      error: "Invalid installedAt",
    });
  }

  next();
};
