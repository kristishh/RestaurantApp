import sequelize from "../util/database";
import {
  STRING,
  INTEGER,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsTo,
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
} from "sequelize";
import { Category } from "./category";

export class Products extends Model<
  InferAttributes<Products>,
  InferCreationAttributes<Products>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare price: number;
  declare categoryId: number | null;
  declare static associations: { category: BelongsTo<Category> };
}

Products.init(
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
    description: {
      type: STRING,
      allowNull: true,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: INTEGER || null,
    },
  },
  { sequelize, tableName: "products", timestamps: false }
);

Products.belongsTo(Category, {
  foreignKey: "id",
  as: "category",
});
