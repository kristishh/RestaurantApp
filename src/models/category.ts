import sequelize from "../util/database";
import {
  STRING,
  INTEGER,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Association,
} from "sequelize";

export class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare parent: number | null;
  declare static associations: { children: Association<Category, Category> };
}
Category.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    parent: { type: INTEGER || null },
  },
  { sequelize, tableName: "category", timestamps: false }
);
Category.hasMany(Category, {
  onDelete: "SET NULL",
  foreignKey: "parent",
  as: "children",
});
