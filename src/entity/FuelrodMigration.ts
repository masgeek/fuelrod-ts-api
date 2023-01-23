import { Column, Entity } from "typeorm";

@Entity("fuelrod_migration", { schema: "fuelrod" })
export class FuelrodMigration {
  @Column("varchar", { name: "ID", length: 255 })
  id: string;

  @Column("varchar", { name: "AUTHOR", length: 255 })
  author: string;

  @Column("varchar", { name: "FILENAME", length: 255 })
  filename: string;

  @Column("datetime", { name: "DATEEXECUTED" })
  dateexecuted: Date;

  @Column("int", { name: "ORDEREXECUTED" })
  orderexecuted: number;

  @Column("varchar", { name: "EXECTYPE", length: 10 })
  exectype: string;

  @Column("varchar", { name: "MD5SUM", nullable: true, length: 35 })
  md5Sum: string | null;

  @Column("varchar", { name: "DESCRIPTION", nullable: true, length: 255 })
  description: string | null;

  @Column("varchar", { name: "COMMENTS", nullable: true, length: 255 })
  comments: string | null;

  @Column("varchar", { name: "TAG", nullable: true, length: 255 })
  tag: string | null;

  @Column("varchar", { name: "LIQUIBASE", nullable: true, length: 20 })
  liquibase: string | null;

  @Column("varchar", { name: "CONTEXTS", nullable: true, length: 255 })
  contexts: string | null;

  @Column("varchar", { name: "LABELS", nullable: true, length: 255 })
  labels: string | null;

  @Column("varchar", { name: "DEPLOYMENT_ID", nullable: true, length: 10 })
  deploymentId: string | null;
}
