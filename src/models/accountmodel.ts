import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../database/database"

// Account Model class
class Account extends Model {
  public id!: number;
  public user_id!: string;
  public account_type!: 'merchant' | 'user';
  public account_number!: string;
  public balance!: number;
  public status!: 'active' | 'notActive';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
// Initialize the model
Account.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,  // temporary and will be changed to false
      defaultValue: 'null'
    },
    account_type: {
      type: DataTypes.ENUM('merchant', 'user'),
      allowNull: false,
    },
    account_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 10000,
    },
    status: {
      type: DataTypes.ENUM('active', 'notActive'),
      allowNull: false,
      defaultValue: 'not',
    },
  },
  {
    sequelize,
    tableName: 'accounts',
    timestamps: true,
  }
);
export default Account;