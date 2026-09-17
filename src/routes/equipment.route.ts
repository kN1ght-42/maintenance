import express from "express";

import {
  createEquipment,
  deleteEquipment,
  getAllEquipments,
  getEquipment,
  updateEquipment,
} from "../controllers/equipment.controller.js";

const router = express.Router();

router.route("/equipment").get(getAllEquipments).post(createEquipment);
router
  .route("/equipment/:id")
  .get(getEquipment)
  .patch(updateEquipment)
  .delete(deleteEquipment);

export default router;
