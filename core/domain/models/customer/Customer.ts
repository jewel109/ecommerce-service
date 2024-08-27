
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";
import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';
export interface CustomerAttributes {
  id?: string;
  name: string;
  email: string;
  password: string;
}

class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> {
  // private readonly createdAt!: Date
  // private readonly updatedAt!: Date
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>
  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string

  @Attribute(DataTypes.STRING)
  @NotNull
  declare email: string

  @Attribute(DataTypes.STRING)
  @NotNull
  declare password: string

}



export default Customer
