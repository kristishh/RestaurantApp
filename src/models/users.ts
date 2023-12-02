import sequelize from '../util/database';
import { Table } from './tables';
import {
  BOOLEAN,
  STRING,
  INTEGER,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare userId: CreationOptional<number>;
  declare fullName: string;
  declare email: string;
  declare password: string;
  declare role: string;
  declare isLoggedIn: boolean;
}
User.init(
  {
    userId: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fullName: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    role: {
      type: STRING,
      allowNull: false,
    },
    isLoggedIn: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, tableName: "users", timestamps: false }
);

User.hasMany(Table, { foreignKey: "waiter" });
