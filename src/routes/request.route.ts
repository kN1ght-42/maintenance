import express from "express";
import {
  createRequest,
  deleteRequest,
  getAllRequests,
  getRequest,
  getRequestsByEquipment,
  updateRequest,
  updateStatus,
} from "../controllers/request.controller.js";
import { validateId } from "../middlewares/common.middleware.js";
import {
  validateCreateRequest,
  validateRequestQuery,
  validateStatus,
  validateUpdateRequest,
} from "../middlewares/request.middleware.js";

const router = express.Router();

router.route("/equipment/:id/requests").get(validateId, getRequestsByEquipment);

router
  .route("/requests")
  .get(validateRequestQuery, getAllRequests)
  .post(validateCreateRequest, createRequest);

router
  .route("/requests/:id")
  .get(validateId, getRequest)
  .patch(validateId, validateUpdateRequest, updateRequest)
  .delete(validateId, deleteRequest);

router
  .route("/requests/:id/status")
  .patch(validateId, validateStatus, updateStatus);

export default router;
