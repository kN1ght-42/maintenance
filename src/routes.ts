import { Router } from "express";
import equipmentRoutes from "./routes/equipment.route.js";
import requestRoutes from "./routes/request.route.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

router.use(equipmentRoutes);
router.use(requestRoutes);

export default router;
