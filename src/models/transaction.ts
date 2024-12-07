/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @stylistic/ts/semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable n/no-process-env */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Model, DataTypes } from "sequelize";
import { sequelize } from '../database/database';
import Account from './accountmodel';

class Transactions extends Model {
    // - `id`: identifier
    // - `type`: credit or debit
    // - `source_account`: Sender’s account
    // - `destination_account`: Receiver’s account
    // - `amount`: The transaction amount.
    // - `status`: (Pending, Completed, Failed, Refunded).
    // - `createdAt`: Transaction timestamp.
    public id!: number;
    public type!: 'credit' | 'debit';
    public source_account!: number; 
    public destination_account!: number; 
    public amount!: number;
    public status!: string;

    public createdAt!: Date;
    public updatedAt!: Date;

    static associate() {
        Transactions.belongsTo(Account, { foreignKey: 'source_account', as: 'SourceAccount' });
        Transactions.belongsTo(Account, { foreignKey: 'destination_account', as: 'DestinationAccount' });
    }
}

Transactions.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    source_account: {
        type: DataTypes.INTEGER,  
        references: {
            model: Account,
            key: 'id',
        },
    },
    destination_account: {
        type: DataTypes.INTEGER,  
        references: {
            model: Account,
            key: 'id',
        },
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    sequelize,
    modelName: 'Transactions', 
    timestamps: true,
});

export default Transactions;
