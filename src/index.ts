import * as express from 'express';         // note : not the best practice but I had an error with esModuleinterop 
import Account from "./models/accounts"
import sequelize from './database/database';
const app = express();

// dummy data

(async () => {
  try {
    // Create five different account objects
    await sequelize.authenticate();

    const account1 = await Account.create({
      user_id: 'user001',
      account_type: 'user',
      account_number: 'ACC12345678',
      balance: 15000,
      status: 'active',
    });

    const account2 = await Account.create({
      user_id: 'user002',
      account_type: 'merchant',
      account_number: 'ACC23456789',
      balance: 25000,
      status: 'active',
    });

    const account3 = await Account.create({
      user_id: 'user003',
      account_type: 'user',
      account_number: 'ACC34567890',
      balance: 10000, // Defaults to 10000
      status: 'not',  // Defaults to 'not'
    });

    const account4 = await Account.create({
      user_id: 'user004',
      account_type: 'merchant',
      account_number: 'ACC45678901',
      balance: 20000,
      status: 'active',
    });

    const account5 = await Account.create({
      user_id: 'user005',
      account_type: 'user',
      account_number: 'ACC56789012',
      balance: 30000,
      status: 'not',
    });

    console.log('Accounts created successfully:');
    console.log(account1.toJSON());
    console.log(account2.toJSON());
    console.log(account3.toJSON());
    console.log(account4.toJSON());
    console.log(account5.toJSON());
  } catch (error) {
    console.error('Error creating accounts:', error);
  }
})();


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
