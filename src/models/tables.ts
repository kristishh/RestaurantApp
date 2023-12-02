import sequelize from '../util/database';
import {
  STRING,
  INTEGER,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class Table extends Model<
  InferAttributes<Table>,
  InferCreationAttributes<Table>
> {
  declare id: CreationOptional<number>;
  declare tableNumber: number;
  declare status: CreationOptional<string>;
  declare capacity: number;
  declare waiter: number | null;
}

Table.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tableNumber: {
      type: INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    status: {
      type: STRING,
      allowNull: false,
      defaultValue: "Free",
      validate: {
        isIn: [["Active", "Free"]],
      },
    },
    capacity: {
      type: INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    waiter: {
      type: INTEGER,
      allowNull: true,
    },
  },
  { sequelize, tableName: "tables", timestamps: false }
);
