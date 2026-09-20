import { appError } from "../utils/appError.js";
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
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "name",
          message: "Некорректное имя",
        },
      ]),
    );
  }

  if (!isValidType(type)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "type",
          message: "Некорректный тип оборудования",
        },
      ]),
    );
  }

  if (typeof serialNumber !== "string" || serialNumber.length === 0) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "serialNumber",
          message: "Некорректный серийный номер оборудования",
        },
      ]),
    );
  }

  if (
    location === undefined ||
    location === null ||
    typeof location !== "object" ||
    typeof location.lat !== "number" ||
    typeof location.lon !== "number"
  ) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "location",
          message: "Некорректные координаты",
        },
      ]),
    );
  }

  if (!isValidStatus(status)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "status",
          message: "Некорректный статус",
        },
      ]),
    );
  }

  if (!isValidInstalledAt(installedAt)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "installedAt",
          message: "Некорректная дата установки",
        },
      ]),
    );
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
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "type",
          message: "Некорректный тип",
        },
      ]),
    );
  }

  if (status && !allowedStatuses.includes(status as string)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "status",
          message: "Некорректный статус",
        },
      ]),
    );
  }

  if (page !== undefined) {
    const pageNumber = Number(page);

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      return next(
        appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
          {
            field: "page",
            message: "Некорректное значение количества страниц",
          },
        ]),
      );
    }
  }

  if (limit !== undefined) {
    const limitNumber = Number(limit);

    if (!Number.isInteger(limitNumber) || limitNumber < 1) {
      return next(
        appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
          {
            field: "limit",
            message: "Некорректное значение лимита данных на страницу",
          },
        ]),
      );
    }
  }

  if (sortBy && !allowedSortFields.includes(sortBy as string)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "sortBy",
          message: "Некорректное значение сортировки данных",
        },
      ]),
    );
  }

  if (order && !allowedOrders.includes(order as string)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "order",
          message: "Некорректное значение порядка вывода данных",
        },
      ]),
    );
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
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "name",
          message: "Некорректное имя",
        },
      ]),
    );
  }

  if (type !== undefined && !isValidType(type)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "type",
          message: "Некорректное тип",
        },
      ]),
    );
  }

  if (
    serialNumber !== undefined &&
    (typeof serialNumber !== "string" || serialNumber.length === 0)
  ) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "serialNumber",
          message: "Некорректный серийный номер оборудования",
        },
      ]),
    );
  }

  if (
    location !== undefined &&
    (location === null ||
      typeof location !== "object" ||
      typeof location.lat !== "number" ||
      typeof location.lon !== "number")
  ) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "location",
          message: "Некорректные координатыя",
        },
      ]),
    );
  }

  if (status !== undefined && !isValidStatus(status)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "status",
          message: "Некорректный статус",
        },
      ]),
    );
  }

  if (installedAt !== undefined && !isValidInstalledAt(installedAt)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "installedAt",
          message: "Некорректная дата установки",
        },
      ]),
    );
  }

  next();
};
