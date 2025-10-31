import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sql } from "../db";

export class Plant extends Model<
  InferAttributes<Plant>,
  InferCreationAttributes<Plant>
> {
  declare id: CreationOptional<number>;
  declare plantName: string;
  declare moisture: number;
  declare lastUpdated: Date;
}

Plant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    plantName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    moisture: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lastUpdated: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize: sql, tableName: "plants", timestamps: false }
);
