import { Request, Response } from "express";
import * as service from "../services/feature.service";

export const createFeature = async (req: any, res: Response) => {
  try {
    const feature = await service.createFeature(
      req.body,
      req.user.organizationId
    );
    res.json(feature);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllFeatures = async (req: any, res: Response) => {
  const features = await service.getAllFeatures(req.user.organizationId);
  res.json(features);
};

export const updateFeature = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid feature ID" });
  }

  const updated = await service.updateFeature(id, req.body);
  res.json(updated);
};

export const deleteFeature = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid feature ID" });
  }

  await service.deleteFeature(id);
  res.json({ message: "Deleted" });
};


export const checkFeature = async (req: Request, res: Response) => {
  try {
    const { orgId, featureKey } = req.query;

    if (!orgId || !featureKey) {
      return res.status(400).json({
        message: "orgId and featureKey are required query parameters",
      });
    }

    const feature = await service.checkFeature(
      featureKey as string, 
      orgId as string
    );

    if (!feature) {
      return res.status(404).json({
        message: "Feature not found or not configured for this organization",
      });
    }

    return res.status(200).json({
      isEnabled: feature.isEnabled,
      message: feature.isEnabled ? "Feature is enabled" : "Feature is disabled",
    });
  } catch (error) {
    console.error("Check Feature Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};