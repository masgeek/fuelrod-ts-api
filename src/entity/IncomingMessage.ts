import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("incoming_message", { schema: "fuelrod" })
export class IncomingMessage {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "message_id", length: 200 })
  messageId: string;

  @Column("varchar", { name: "link_id", length: 200 })
  linkId: string;

  @Column("text", { name: "message" })
  message: string;

  @Column("varchar", { name: "short_code", length: 50 })
  shortCode: string;

  @Column("varchar", { name: "date_sent", nullable: true, length: 30 })
  dateSent: string | null;

  @Column("varchar", { name: "phone_number", length: 30 })
  phoneNumber: string;

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
