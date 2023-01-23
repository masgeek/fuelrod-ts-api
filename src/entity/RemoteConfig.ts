import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("config-name-uk", ["appName", "configName"], { unique: true })
@Entity("remote_config", { schema: "fuelrod" })
export class RemoteConfig {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "app_name", length: 50 })
  appName: string;

  @Column("varchar", { name: "config_name", length: 50 })
  configName: string;

  @Column("text", { name: "config_value" })
  configValue: string;

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
