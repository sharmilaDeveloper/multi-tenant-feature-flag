import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { organization } from "../entities/Organization";
import { FeatureFlag } from "../entities/FeatureFlag";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "multi_tenant_feature_flags",
  synchronize: true,
  logging: false,
  entities: [User, organization, FeatureFlag],
});