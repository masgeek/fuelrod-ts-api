import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_network_code", ["networkCode"], {})
@Index("idx-actual-cost", ["actualCost"], {})
@Index("idx-currency", ["currency"], {})
@Index("idx-delivery-status", ["deliveryStatus"], {})
@Index("idx-message-id", ["messageId"], {})
@Index("idx-sms-outbox-user-id", ["userId"], {})
@Index("idx-created-at", ["createdAt"], {})
@Index("idx-sms-outbox-hash", ["messageHash"], { fulltext: true })
@Entity("campaign_outbox", { schema: "fuelrod" })
export class CampaignOutbox {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "user_id", nullable: true })
  userId: string | null;

  @Column("bigint", { name: "campaign_id", nullable: true })
  campaignId: string | null;

  @Column("varchar", { name: "message_hash", nullable: true, length: 150 })
  messageHash: string | null;

  @Column("varchar", { name: "date_time", nullable: true, length: 100 })
  dateTime: string | null;

  @Column("varchar", { name: "message_id", nullable: true, length: 255 })
  messageId: string | null;

  @Column("varchar", { name: "sender_id", nullable: true, length: 15 })
  senderId: string | null;

  @Column("varchar", { name: "currency", nullable: true, length: 4 })
  currency: string | null;

  @Column("decimal", {
    name: "currency_rate",
    nullable: true,
    precision: 10,
    scale: 2,
    default: () => "'0.00'",
  })
  currencyRate: string | null;

  @Column("varchar", { name: "phone_number", nullable: true, length: 150 })
  phoneNumber: string | null;

  @Column("text", { name: "sms_text", nullable: true })
  smsText: string | null;

  @Column("bigint", {
    name: "network_code",
    nullable: true,
    default: () => "'0'",
  })
  networkCode: string | null;

  @Column("int", { name: "character_count", nullable: true })
  characterCount: number | null;

  @Column("int", { name: "sms_count", nullable: true })
  smsCount: number | null;

  @Column("int", { name: "retry_count", nullable: true, default: () => "'0'" })
  retryCount: number | null;

  @Column("decimal", {
    name: "single_sms_cost",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  singleSmsCost: string | null;

  @Column("varchar", {
    name: "message_string_cost",
    nullable: true,
    length: 25,
  })
  messageStringCost: string | null;

  @Column("decimal", {
    name: "message_cost",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  messageCost: string | null;

  @Column("decimal", {
    name: "actual_cost",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  actualCost: string | null;

  @Column("varchar", { name: "delivery_status", nullable: true, length: 100 })
  deliveryStatus: string | null;

  @Column("bit", {
    name: "message_delivered",
    nullable: true,
    default: () => "'b'0''",
  })
  messageDelivered: boolean | null;

  @Column("varchar", { name: "failure_reason", nullable: true, length: 100 })
  failureReason: string | null;

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
}
