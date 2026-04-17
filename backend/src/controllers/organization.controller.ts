import { Request, Response } from "express";
import * as orgService from "../services/organization.service";

export const createOrg = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const org = await orgService.createOrganization(name);
    res.json(org);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getOrgs = async (req: Request, res: Response) => {
  const orgs = await orgService.getOrganizations();
  res.json(orgs);
};

export const updateOrganizationStatus = async (req: Request, res: Response) => {
  try {
const id = req.params.id as string;
    const { isActive } = req.body;

if (!id) {
  return res.status(400).json({ message: "id is required" });
}

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ message: "isActive must be boolean" });
    }

    const updated = await orgService.updateOrganizationStatus(id, isActive);

    return res.status(200).json({
      message: "Organization status updated",
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};