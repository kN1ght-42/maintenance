import type { NextFunction, Request, Response } from "express";
import {
  isValidDescription,
  isValidPlannedAt,
  isValidPriority,
  isValidRequestStatus,
  isValidTitle,
} from "../utils/validators.js";

export const validateCreateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, equipmentId, priority, plannedAt } = req.body;

  if (!isValidTitle(title)) {
    return res.status(400).json({
      error: "Invalid title",
    });
  }

  if (description !== undefined && !isValidDescription(description)) {
    return res.status(400).json({
      error: "Invalid description",
    });
  }

  if (equipmentId === undefined || typeof equipmentId !== "string") {
    return res.status(400).json({
      error: "Invalid equipmentId",
    });
  }

  if (!isValidPriority(priority)) {
    return res.status(400).json({
      error: "Invalid request priority",
    });
  }

  if (plannedAt !== undefined && !isValidPlannedAt(plannedAt)) {
    return res.status(400).json({
      error: "Invalid plannedAt",
    });
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
    return res.status(400).json({
      error: "Invalid priority filter",
    });
  }

  if (status && !allowedStatuses.includes(status as string)) {
    return res.status(400).json({
      error: "Invalid status filter",
    });
  }

  if (equipmentId !== undefined && typeof equipmentId !== "string") {
    return res.status(400).json({
      error: "Invalid equipmentId filter",
    });
  }

  if (plannedFrom !== undefined && !isValidPlannedAt(plannedFrom)) {
    return res.status(400).json({
      error: "Invalid plannedFrom",
    });
  }

  if (plannedTo !== undefined && !isValidPlannedAt(plannedTo)) {
    return res.status(400).json({
      error: "Invalid plannedTo",
    });
  }

  if (
    plannedFrom !== undefined &&
    plannedTo !== undefined &&
    new Date(plannedFrom as string) > new Date(plannedTo as string)
  ) {
    return res.status(400).json({
      error: "plannedFrom cannot be greater than plannedTo",
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

export const validateUpdateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { title, description, priority, plannedAt } = req.body;

  if (title !== undefined && !isValidTitle(title)) {
    return res.status(400).json({
      error: "Invalid title",
    });
  }

  if (description !== undefined && !isValidDescription(description)) {
    return res.status(400).json({
      error: "Invalid description",
    });
  }

  if (priority !== undefined && !isValidPriority(priority)) {
    return res.status(400).json({
      error: "Invalid request priority",
    });
  }

  if (plannedAt !== undefined && !isValidPlannedAt(plannedAt)) {
    return res.status(400).json({
      error: "Invalid plannedAt",
    });
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
    return res.status(400).json({
      error: "Invalid request status",
    });
  }

  next();
};
