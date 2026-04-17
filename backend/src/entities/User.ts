import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ORG_ADMIN = "ORG_ADMIN",
  USER = "USER",
}

@Entity("users")
export class User extends BaseEntity{

@Column({ name: "email", unique: true })
  email!: string;

  @Column({ name: "password" })
    password!: string;

  @Column({
    name: "role",
    type: "enum",
    enum: Role,
  })
  role!: Role;

  @Column({ name: "org_id", nullable: true })
  organizationId!: string;
}