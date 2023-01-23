import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("number_blacklist", { schema: "fuelrod" })
export class NumberBlacklist {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "phone_number", nullable: true, length: 150 })
  phoneNumber: string | null;

  @Column("varchar", { name: "sender_id", nullable: true, length: 15 })
  senderId: string | null;

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
