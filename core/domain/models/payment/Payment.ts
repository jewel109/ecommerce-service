import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, AutoIncrement, NotNull, PrimaryKey } from "@sequelize/core/decorators-legacy";


export interface PaymentAttributes {
  id: number;
  orderId: number;
  amount: number;
  method: "stripe";
  status: "pending" | "fulfilled";
}

export default class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> implements PaymentAttributes {

  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: number;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare orderId: number

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare amount: number



  @Attribute(DataTypes.STRING)
  @NotNull
  declare method: "stripe"


  @Attribute(DataTypes.STRING)
  @NotNull
  declare status: "pending"


}
