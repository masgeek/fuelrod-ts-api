import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("id", ["id"], { unique: true })
@Index("unique_jwt_token", ["token"], { unique: true })
@Index("jwt_token_username", ["userName"], {})
@Entity("user_tokens", { schema: "fuelrod" })
export class UserTokens {
  @Column("varchar", { primary: true, name: "id", length: 64 })
  id: string;

  @Column("varchar", { name: "user_name", nullable: true, length: 18 })
  userName: string | null;

  @Column("varchar", {
    name: "token",
    nullable: true,
    unique: true,
    length: 200,
  })
  token: string | null;

  @Column("datetime", { name: "expiry_date", nullable: true })
  expiryDate: Date | null;

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

  @ManyToOne(() => Users, (users) => users.userTokens, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_name", referencedColumnName: "username" }])
  userName2: Users;
}
