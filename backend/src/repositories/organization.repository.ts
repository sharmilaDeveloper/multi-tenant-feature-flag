import { AppDataSource } from "../config/data-source";
import { organization } from "../entities/Organization";

const repo = AppDataSource.getRepository(organization);

const generateOrgCode = (name: string) => {
  const clean = name.replace(/\s+/g, "").toUpperCase();
  const prefix = clean.substring(0, 3).padEnd(3, "X");
  const random = Math.floor(100 + Math.random() * 900);
  return `${prefix}${random}`;
};

export const createOrg = async (name: string) => {
let orgCode: string = "";
  let exists = true;

  while (exists) {
    orgCode = generateOrgCode(name);

    const found = await repo.findOne({ where: { orgCode } });
    if (!found) exists = false;
  }

  const org = repo.create({
    name,
    orgCode,
  });

  return repo.save(org);
};

export const getAllOrgs = async () => {
  return repo.find();
};


export const findById = async (id: string) => {
  return repo.findOne({ where: { id } });
};

export const save = async (org: organization) => {
  return repo.save(org);
};

export const findByCode = async (orgCode: string) => {
  return repo.findOne({ where: { orgCode } });
};