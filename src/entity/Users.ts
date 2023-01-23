import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserApiConfig } from "./UserApiConfig";
import { SmsCampaign } from "./SmsCampaign";
import { SmsStats } from "./SmsStats";
import { UserSmsCredit } from "./UserSmsCredit";
import { UserTokens } from "./UserTokens";

@Index("user_uuid_uk", ["uuid"], { unique: true })
@Index("user_name", ["username"], { unique: true })
@Entity("users", { schema: "fuelrod" })
export class Users {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "uuid", unique: true, length: 64 })
  uuid: string;

  @Column("varchar", {
    name: "username",
    nullable: true,
    unique: true,
    length: 18,
  })
  username: string | null;

  @Column("varchar", { name: "user_role", length: 8, default: () => "'USER'" })
  userRole: string;

  @Column("varchar", { name: "client_name", nullable: true, length: 200 })
  clientName: string | null;

  @Column("varchar", { name: "user_email", nullable: true, length: 50 })
  userEmail: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 200 })
  password: string | null;

  @Column("decimal", {
    name: "message_cost",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'1.50'",
  })
  messageCost: string | null;

  @Column("bit", { name: "overdraft", nullable: true })
  overdraft: boolean | null;

  @Column("bit", { name: "enabled", nullable: true })
  enabled: boolean | null;

  @Column("varchar", {
    name: "flag_reason",
    length: 50,
    default: () => "'ACTIVE'",
  })
  flagReason: string;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(() => UserApiConfig, (userApiConfig) => userApiConfig.userUu)
  userApiConfigs: UserApiConfig[];

  @OneToMany(() => SmsCampaign, (smsCampaign) => smsCampaign.userUu)
  smsCampaigns: SmsCampaign[];

  @OneToMany(() => SmsStats, (smsStats) => smsStats.user)
  smsStats: SmsStats[];

  @OneToMany(() => UserSmsCredit, (userSmsCredit) => userSmsCredit.userUu)
  userSmsCredits: UserSmsCredit[];

  @OneToMany(() => UserTokens, (userTokens) => userTokens.userName2)
  userTokens: UserTokens[];
}
