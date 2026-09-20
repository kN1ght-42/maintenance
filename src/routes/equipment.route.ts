import express from "express";

import {
  createEquipment,
  deleteEquipment,
  getAllEquipments,
  getEquipment,
  getEquipmentWeather,
  updateEquipment,
} from "../controllers/equipment.controller.js";
import {
  validateCreateEquipment,
  validateEquipmentQuery,
  validateUpdateEquipment,
} from "../middlewares/equipment.middleware.js";
import { validateId } from "../middlewares/common.middleware.js";

const router = express.Router();

router
  .route("/equipment")
  .get(validateEquipmentQuery, getAllEquipments)
  .post(validateCreateEquipment, createEquipment);

router
  .route("/equipment/:id")
  .get(validateId, getEquipment)
  .patch(validateId, validateUpdateEquipment, updateEquipment)
  .delete(validateId, deleteEquipment);

router.get("/equipment/:id/weather", validateId, getEquipmentWeather);

export default router;
