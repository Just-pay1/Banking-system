import express from 'express';
import Account from './models/accounts';
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());


(async () => {
  try {
    // Create a new account and save it to the database
    const newAccount = await Account.create({
      user_id: 'user123',
      account_type: 'user', // or 'merchant'
      account_number: 'AC1234567890',
      balance: 15000, // Optional, as it defaults to 10000 if not provided
      status: 'active', // Optional, as it defaults to 'not' if not provided
    });

    console.log('New Account Created:', newAccount.toJSON());
  } catch (error) {
    console.error('Error creating account:', error);
  }
})();

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Example POST route
app.post('/data', (req, res) => {
  const data = req.body;
  res.json({ received: data });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
