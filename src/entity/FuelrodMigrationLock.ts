import { Column, Entity } from "typeorm";

@Entity("fuelrod_migration_lock", { schema: "fuelrod" })
export class FuelrodMigrationLock {
  @Column("int", { primary: true, name: "ID" })
  id: number;

  @Column("bit", { name: "LOCKED" })
  locked: boolean;

  @Column("datetime", { name: "LOCKGRANTED", nullable: true })
  lockgranted: Date | null;

  @Column("varchar", { name: "LOCKEDBY", nullable: true, length: 255 })
  lockedby: string | null;
}
