import { Router } from "express";
import equipmentRoutes from "./routes/equipment.route.js";

const router = Router();

router.use(equipmentRoutes);

export default router;
