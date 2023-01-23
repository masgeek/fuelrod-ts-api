import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("opt_out", { schema: "fuelrod" })
export class OptOut {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "sender_id", nullable: true, length: 15 })
  senderId: string | null;

  @Column("varchar", { name: "phone_number", nullable: true, length: 25 })
  phoneNumber: string | null;

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
