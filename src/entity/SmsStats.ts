import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("fk-sms-stats-user-id", ["userId"], {})
@Index("idx-message-date", ["messageDate"], {})
@Entity("sms_stats", { schema: "fuelrod" })
export class SmsStats {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "user_id" })
  userId: string;

  @Column("varchar", { name: "user_uuid", nullable: true, length: 64 })
  userUuid: string | null;

  @Column("decimal", { name: "message_cost", precision: 10, scale: 2 })
  messageCost: string;

  @Column("bigint", { name: "message_count" })
  messageCount: string;

  @Column("date", { name: "message_date", nullable: true })
  messageDate: string | null;

  @ManyToOne(() => Users, (users) => users.smsStats, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
