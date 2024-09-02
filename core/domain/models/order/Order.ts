import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, AutoIncrement, NotNull, PrimaryKey } from "@sequelize/core/decorators-legacy";

export interface OrderAttributes {
  id: number;
  customerId: number;
  totalAmount: number;
  status: "pending" | "fulfilled" | "failed";
}
export default class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> implements OrderAttributes {

  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare customerId: number

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare totalAmount: number



  @Attribute(DataTypes.STRING)
  @NotNull
  declare status: "pending"


}
