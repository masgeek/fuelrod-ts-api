import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("idx-credit-amount", ["creditAmount"], {})
@Index("user-credit-uid-fk", ["userUuid"], {})
@Entity("user_sms_credit", { schema: "fuelrod" })
export class UserSmsCredit {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "user_uuid", length: 64 })
  userUuid: string;

  @Column("decimal", { name: "credit_amount", precision: 10, scale: 2 })
  creditAmount: string;

  @Column("varchar", {
    name: "remarks",
    comment: "Comments regarding the top up",
    length: 150,
  })
  remarks: string;

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

  @ManyToOne(() => Users, (users) => users.userSmsCredits, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_uuid", referencedColumnName: "uuid" }])
  userUu: Users;
}
