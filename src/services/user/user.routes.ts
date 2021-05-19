import { Router } from "express";

import UserController from "./user.controller";

const router = Router();

router.param("userId", UserController.find);

router.route("/").get(UserController.list).post(UserController.create);

router
  .route("/:userId")
  .put(UserController.update)
  .delete(UserController.delete);

export default router;
