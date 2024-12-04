import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import sequelize from "../database/database"



// Define the attributes interface for type safety
interface AccountAttributes {
  id: string; // 'inc', a string-based unique identifier
  user_id: string; // HTTP request user ID
  account_type: 'merchant' | 'user'; // Type: 'mer' or 'user'
  account_number: string; // Algorithm-generated account number
  balance: number; // Default: 10000
  status: 'active' | 'not'; // Default: 'active'
}

// Optional fields for Sequelize `create` method
interface AccountCreationAttributes extends Optional<AccountAttributes, 'id' | 'balance' | 'status'> { }

// Account Model class
class Account extends Model<AccountAttributes, AccountCreationAttributes> implements AccountAttributes {
  public id!: string;
  public user_id!: string;
  public account_type!: 'merchant' | 'user';
  public account_number!: string;
  public balance!: number;
  public status!: 'active' | 'not';

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
Account.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
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
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10000,
    },
    status: {
      type: DataTypes.ENUM('active', 'not'),
      allowNull: false,
      defaultValue: 'not',
    },
  },
  {
    sequelize,
    tableName: 'accounts',
    timestamps: true, // Adds createdAt and updatedAt
  }
);




(async () => {
  try {
    await Account.sync();
    console.log('Account table created successfully!');
  } catch (error) {
    console.error('Error creating Account table:', error);
  }
})();


export default Account;
