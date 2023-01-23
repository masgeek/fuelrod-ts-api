import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MessageQueue } from "./MessageQueue";
import { Users } from "./Users";

@Index("idx-campaign-status", ["campaignStatus"], {})
@Index("user-campaign-uid-fk", ["userUuid"], {})
@Entity("sms_campaign", { schema: "fuelrod" })
export class SmsCampaign {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "user_uuid", length: 64 })
  userUuid: string;

  @Column("varchar", { name: "campaign_name", length: 255 })
  campaignName: string;

  @Column("varchar", { name: "campaign_status", nullable: true, length: 100 })
  campaignStatus: string | null;

  @Column("bit", { name: "is_draft", nullable: true, default: () => "'b'1''" })
  isDraft: boolean | null;

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

  @OneToMany(() => MessageQueue, (messageQueue) => messageQueue.campaign)
  messageQueues: MessageQueue[];

  @ManyToOne(() => Users, (users) => users.smsCampaigns, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_uuid", referencedColumnName: "uuid" }])
  userUu: Users;
}
