import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./BaseEntity";

@Entity("organizations")
export class organization extends BaseEntity{

@Column({ name: "org_name" })
  name!: string;

@Column({ unique: true })
orgCode!: string;

  @Column({ default: true })
  isActive!: boolean;

}

