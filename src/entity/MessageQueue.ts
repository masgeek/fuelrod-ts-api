import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SmsCampaign } from "./SmsCampaign";

@Index("fk-campaign-id", ["campaignId"], {})
@Index("idx-phone-number", ["phoneNumber"], {})
@Index("idx-message-queue-hash", ["messageHash"], { fulltext: true })
@Entity("message_queue", { schema: "fuelrod" })
export class MessageQueue {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "campaign_id" })
  campaignId: string;

  @Column("varchar", { name: "message_hash", nullable: true, length: 150 })
  messageHash: string | null;

  @Column("varchar", { name: "message_status", nullable: true, length: 100 })
  messageStatus: string | null;

  @Column("text", { name: "message" })
  message: string;

  @Column("int", { name: "message_length", default: () => "'160'" })
  messageLength: number;

  @Column("varchar", { name: "phone_number", nullable: true, length: 150 })
  phoneNumber: string | null;

  @Column("bit", {
    name: "number_valid",
    nullable: true,
    default: () => "'b'0''",
  })
  numberValid: boolean | null;

  @Column("int", { name: "sms_count", nullable: true })
  smsCount: number | null;

  @Column("decimal", {
    name: "message_cost",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  messageCost: string | null;

  @Column("bit", {
    name: "message_sent",
    nullable: true,
    default: () => "'b'0''",
  })
  messageSent: boolean | null;

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

  @ManyToOne(() => SmsCampaign, (smsCampaign) => smsCampaign.messageQueues, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "campaign_id", referencedColumnName: "id" }])
  campaign: SmsCampaign;
}
