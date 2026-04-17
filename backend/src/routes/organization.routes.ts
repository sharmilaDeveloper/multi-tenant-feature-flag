import { Router } from "express";
import * as controller from "../controllers/organization.controller";
import { authMiddleware } from "../middleware/auth";
import { authorize } from "../middleware/role";

const router = Router();

router.post(
  "/",
  authMiddleware,
  authorize(["SUPER_ADMIN"]),
  controller.createOrg
);

router.get(
  "/",
  authMiddleware,
  authorize(["SUPER_ADMIN"]),
  controller.getOrgs
);

router.put(
  "/:id",
  authMiddleware,
  authorize(["SUPER_ADMIN"]),
  controller.updateOrganizationStatus
);

export default router;