import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("untracked_callback", { schema: "fuelrod" })
export class UntrackedCallback {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", {
    name: "message_id",
    comment: "message identifier",
    length: 250,
  })
  messageId: string;

  @Column("varchar", { name: "network_code", nullable: true, length: 50 })
  networkCode: string | null;

  @Column("varchar", { name: "phone_number", nullable: true, length: 100 })
  phoneNumber: string | null;

  @Column("varchar", { name: "message_status", nullable: true, length: 100 })
  messageStatus: string | null;

  @Column("int", { name: "retry_count", nullable: true })
  retryCount: number | null;

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
