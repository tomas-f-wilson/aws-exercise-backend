import { Router } from "express";
import userRoutes from "../services/user/user.routes";

const router = Router();

router.use("/users", userRoutes);
export default router;
