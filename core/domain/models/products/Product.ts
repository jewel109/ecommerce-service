import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';



export interface ProductAttributes {
  name: string;
  price: number;
  catagory: string;
  description: string;
  stock: number
}

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {

  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string

  @Attribute(DataTypes.STRING)
  declare description: string

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare price: number

  @Attribute(DataTypes.STRING)
  declare catagory: string

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare stock: number
}


export default Product
