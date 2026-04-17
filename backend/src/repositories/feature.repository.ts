import { AppDataSource } from "../config/data-source";
import { FeatureFlag } from "../entities/FeatureFlag";

const repo = AppDataSource.getRepository(FeatureFlag);

export const createFeature = async (data: Partial<FeatureFlag>) => {
  const feature = repo.create(data);
  return repo.save(feature);
};

export const findByKeyAndOrg = async (
  featureKey: string,
  organizationId: string
) => {
  return repo.findOne({
    where: { featureKey, organizationId },
  });
};

export const getAllByOrg = async (organizationId: string) => {
  return repo.find({
    where: { organizationId },
  });
};

export const updateFeature = async (
  id: string,
  data: Partial<FeatureFlag>
) => {
  await repo.update(id, data);
  return repo.findOne({ where: { id } });
};

export const deleteFeature = async (id: string) => {
  return repo.delete(id);
};