import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("unique_user_service", ["id", "msgService"], { unique: true })
@Index("unique_user_sender_id", ["id", "senderId"], { unique: true })
@Index("user_uid_fk", ["userUuid"], {})
@Entity("user_api_config", { schema: "fuelrod" })
export class UserApiConfig {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "user_uuid", length: 64 })
  userUuid: string;

  @Column("varchar", { name: "msg_service", length: 20 })
  msgService: string;

  @Column("varchar", {
    name: "service_type",
    nullable: true,
    length: 10,
    default: () => "'BULK_SMS'",
  })
  serviceType: string | null;

  @Column("varchar", { name: "sender_id", nullable: true, length: 11 })
  senderId: string | null;

  @Column("bit", { name: "active", nullable: true, default: () => "'b'0''" })
  active: boolean | null;

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

  @ManyToOne(() => Users, (users) => users.userApiConfigs, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_uuid", referencedColumnName: "uuid" }])
  userUu: Users;
}
