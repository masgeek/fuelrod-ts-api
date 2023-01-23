import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SmsOutbox } from "./SmsOutbox";

@Index("mcc_ref", ["mccRef"], { unique: true })
@Entity("mobile_network", { schema: "fuelrod" })
export class MobileNetwork {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "country", nullable: true, length: 150 })
  country: string | null;

  @Column("varchar", { name: "country_code", nullable: true, length: 5 })
  countryCode: string | null;

  @Column("int", { name: "mcc_code", nullable: true })
  mccCode: number | null;

  @Column("bigint", { name: "mcc_ref", nullable: true, unique: true })
  mccRef: string | null;

  @Column("int", { name: "mnc_code", nullable: true })
  mncCode: number | null;

  @Column("varchar", { name: "network_name", nullable: true, length: 200 })
  networkName: string | null;

  @Column("int", { name: "mobile_code", nullable: true })
  mobileCode: number | null;

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

  @OneToMany(() => SmsOutbox, (smsOutbox) => smsOutbox.networkCode2)
  smsOutboxes: SmsOutbox[];
}
