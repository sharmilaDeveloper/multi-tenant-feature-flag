import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const repo = AppDataSource.getRepository(User);

export const createUser = async (data: Partial<User>) => {
  const user = repo.create(data);
  return repo.save(user);
};

export const findByEmail = async (email: string) => {
  return repo.findOne({ where: { email } });
};