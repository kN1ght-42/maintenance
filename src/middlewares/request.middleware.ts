import type { NextFunction, Request, Response } from "express";
import {
  isValidDescription,
  isValidPlannedAt,
  isValidPriority,
  isValidRequestStatus,
  isValidTitle,
} from "../utils/validators.js";
import { appError } from "../utils/appError.js";

export const validateCreateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, equipmentId, priority, plannedAt } = req.body;

  if (!isValidTitle(title)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "title",
          message: "Некорректный заголовок",
        },
      ]),
    );
  }

  if (description !== undefined && !isValidDescription(description)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "description",
          message: "Некорректное описание",
        },
      ]),
    );
  }

  if (equipmentId === undefined || typeof equipmentId !== "string") {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "equipmentId",
          message: "Некорректный идентификатор оборудования",
        },
      ]),
    );
  }

  if (!isValidPriority(priority)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "priority",
          message: "Некорректный приоритет",
        },
      ]),
    );
  }

  if (plannedAt !== undefined && !isValidPlannedAt(plannedAt)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "plannedAt",
          message: "Некорректная дата планирования",
        },
      ]),
    );
  }

  next();
};

export const validateRequestQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    priority,
    status,
    equipmentId,
    plannedFrom,
    plannedTo,
    page,
    limit,
    sortBy,
    order,
  } = req.query;

  const allowedPriorities = ["low", "medium", "high", "critical"];
  const allowedStatuses = ["new", "in_progress", "done", "rejected"];
  const allowedSortFields = ["title", "priority", "status", "plannedAt"];
  const allowedOrders = ["asc", "desc"];

  if (priority && !allowedPriorities.includes(priority as string)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "priority",
          message: "Некорректный приоритет",
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

  if (equipmentId !== undefined && typeof equipmentId !== "string") {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "equipmentId",
          message: "Некорректный идентификатор оборудования",
        },
      ]),
    );
  }

  if (plannedFrom !== undefined && !isValidPlannedAt(plannedFrom)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "plannedFrom",
          message: "Некорректная дата фильтра 'от'",
        },
      ]),
    );
  }

  if (plannedTo !== undefined && !isValidPlannedAt(plannedTo)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "plannedTo",
          message: "Некорректная дата фильтра 'до'",
        },
      ]),
    );
  }

  if (
    plannedFrom !== undefined &&
    plannedTo !== undefined &&
    new Date(plannedFrom as string) > new Date(plannedTo as string)
  ) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "plannedFrom/plannedTo",
          message: "Некорректный диапазон дат",
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

export const validateUpdateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, priority, plannedAt } = req.body;

  if (title !== undefined && !isValidTitle(title)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "title",
          message: "Некорректный заголовок",
        },
      ]),
    );
  }

  if (description !== undefined && !isValidDescription(description)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "description",
          message: "Некорректное описание",
        },
      ]),
    );
  }

  if (priority !== undefined && !isValidPriority(priority)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "priority",
          message: "Некорректный приоритет",
        },
      ]),
    );
  }

  if (plannedAt !== undefined && !isValidPlannedAt(plannedAt)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "plannedAt",
          message: "Некорректная дата планирования",
        },
      ]),
    );
  }

  next();
};

export const validateStatus = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { status } = req.body;

  if (!isValidRequestStatus(status)) {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "status",
          message: "Некорректный статус",
        },
      ]),
    );
  }

  next();
};
