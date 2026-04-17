import * as featureRepo from "../repositories/feature.repository";
import * as organizationRepo from "../repositories/organization.repository";
export const createFeature = async (data: any, orgId: string) => {
  return featureRepo.createFeature({
    ...data,
    organizationId: orgId,
  });
};

export const getFeature = async (key: string, orgId: string) => {
  return featureRepo.findByKeyAndOrg(key, orgId);
};

export const getAllFeatures = async (orgId: string) => {
  return featureRepo.getAllByOrg(orgId);
};

export const updateFeature = async (id: string, data: any) => {
  return featureRepo.updateFeature(id, data);
};

export const deleteFeature = async (id: string) => {
  return featureRepo.deleteFeature(id);
};

export const checkFeature = async (key: string, orgCode: string) => {
const org = await organizationRepo.findByCode(orgCode);
  
  if (!org) {
    throw new Error("Organization not found");
  }

  return await featureRepo.findByKeyAndOrg(key, org.id);
};