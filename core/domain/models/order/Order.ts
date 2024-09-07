import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, AutoIncrement, NotNull, PrimaryKey } from "@sequelize/core/decorators-legacy";

export interface OrderAttributes {
  customerId: number;
  totalAmount: number;
  orderStatus: "pending" | "fulfilled" | "failed";
}
export default class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> implements OrderAttributes {

  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare customerId: number

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare totalAmount: number



  @Attribute(DataTypes.STRING)
  @NotNull
  declare orderStatus: "pending" | "fulfilled" | "failed"


}
