import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("feature_flags")
@Unique(["organizationId", "featureKey"])
export class FeatureFlag extends BaseEntity{

  @Column({ name: "feature_key" })
  featureKey!: string;

  @Column({ name: "is_enabled" })
  isEnabled!: boolean;

  @Column({ name: "org_id" })
  organizationId!: string;
}