import {
  DataTypes,
  Sequelize,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

const connectionStr = process.env.CONNECTION_STRING;
if (!connectionStr) {
  throw new Error("DB connection string is missing");
}

const sql = new Sequelize(connectionStr);

export class Event extends Model<
  InferAttributes<Event>,
  InferCreationAttributes<Event>
> {
  declare id: CreationOptional<number>;
  declare moisture: number;
  declare timestamp: CreationOptional<Date>;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      defaultValue: DataTypes.INTEGER,
      allowNull: false,
    },
    moisture: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  { sequelize: sql }
);
