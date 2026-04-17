import * as orgRepo from "../repositories/organization.repository";

export const createOrganization = async (name: string) => {
  return orgRepo.createOrg(name);
};

export const getOrganizations = async () => {
  return orgRepo.getAllOrgs();
};

export const updateOrganizationStatus = async (
  id: string,
  isActive: boolean
) => {
  const org = await orgRepo.findById(id);

  if (!org) {
    throw new Error("Organization not found");
  }

  org.isActive = isActive;

  return await orgRepo.save(org);
};