import { Router } from "express";
import * as controller from "../controllers/feature.controller";
import { authMiddleware } from "../middleware/auth";
import { authorize } from "../middleware/role";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorize(["ORG_ADMIN"]),
  controller.createFeature
);

router.get(
  "/",
  authMiddleware,
  authorize(["ORG_ADMIN"]),
  controller.getAllFeatures
);

router.put(
  "/:id",
  authMiddleware,
  authorize(["ORG_ADMIN"]),
  controller.updateFeature
);

router.delete(
  "/:id",
  authMiddleware,
  authorize(["ORG_ADMIN"]),
  controller.deleteFeature
);

router.get(
  "/check",
  controller.checkFeature
);


export default router;