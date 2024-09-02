import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, AutoIncrement, NotNull, PrimaryKey } from "@sequelize/core/decorators-legacy";




interface CartItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export default class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> implements CartItemAttributes {

  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare orderId: number

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare productId: number



  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare quantity: number


  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare price: number

}
