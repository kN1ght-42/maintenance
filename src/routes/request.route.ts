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

const router = express.Router();

router.route("/equipment/:id/requests").get(getRequestsByEquipment);

router.route("/requests").get(getAllRequests).post(createRequest);

router
  .route("/requests/:id")
  .get(getRequest)
  .patch(updateRequest)
  .delete(deleteRequest);

router.route("/requests/:id/status").patch(updateStatus);

export default router;
