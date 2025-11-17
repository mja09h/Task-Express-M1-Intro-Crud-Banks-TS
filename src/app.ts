import express from "express";
import { accounts } from "../data/accounts";

const app = express();
const PORT = 5000;
const HOST = '127.0.0.1';

// Middleware to parse JSON bodies
app.use(express.json());


app.get('/allAccounts', (req, res) => {
    res.status(200).json({ accounts })
});

app.post('/createAccount', (req, res) => {
    const { username, funds } = req.body;
    if (!username || !funds) {
        return res.status(400).json({ message: 'Username and funds are required' });
    }

    const newAccount = {
        id: accounts.length + 1,
        username,
        funds
    }

    accounts.push(newAccount);
    res.status(201).json({ message: 'Account created successfully', account: newAccount });
});

app.delete('/deleteAccount/:id', (req, res) => {
    const { id } = req.params;
    const account = accounts.find((account) => account.id === parseInt(id));
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }
    accounts.splice(accounts.indexOf(account), 1);
    res.status(200).json({ message: 'Account deleted successfully', account: account });

});

app.put('/updateAccount/:id', (req, res) => {
    const { id } = req.params;
    const { username, funds } = req.body;
    if (!username || !funds) {
        return res.status(400).json({ message: 'Username and funds are required' });
    }

    const account = accounts.find((account) => account.id === parseInt(id));

    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }

    account.username = username;
    account.funds = funds;

    res.status(200).json({ message: 'Account updated successfully', account: account });
});

app.get('/getAccount/:id', (req, res) => {
    const { id } = req.params;
    const account = accounts.find((account) => account.id === parseInt(id));
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }
    res.status(200).json({ account: account });
});

app.get('/getAccountByUsername/:username', (req, res) => {
    const { username } = req.params;
    const account = accounts.find((account) => account.username === username);
    if (!account) {
        return res.status(404).json({ message: 'Account not found' });
    }

    res.status(200).json({ account: account });
});


app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});

export default app;

