import request from 'supertest';
import app from '../src/app';
import { accounts } from '../data/accounts';

describe('Bank Accounts API Tests', () => {

    // Test GET /allAccounts
    describe('GET /allAccounts', () => {
        it('should return all accounts with status 200', async () => {
            const response = await request(app)
                .get('/api/v1/accounts/allAccounts')
                .expect(200);

            expect(response.body).toHaveProperty('accounts');
            expect(Array.isArray(response.body.accounts)).toBe(true);
        });
    });

    // Test GET /getAccount/:id
    describe('GET /getAccount/:id', () => {
        it('should return a specific account when id exists', async () => {
            const response = await request(app)
                .get('/api/v1/accounts/getAccount/1')
                .expect(200);

            expect(response.body).toHaveProperty('account');
            expect(response.body.account).toHaveProperty('id');
            expect(response.body.account).toHaveProperty('username');
            expect(response.body.account).toHaveProperty('funds');
            expect(response.body.account.id).toBe(1);
        });

        it('should return 404 when account id does not exist', async () => {
            const response = await request(app)
                .get('/api/v1/accounts/getAccount/999')
                .expect(404);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Account not found');
        });
    });

    // Test GET /getAccountByUsername/:username
    describe('GET /getAccountByUsername/:username', () => {
        it('should return a specific account when username exists', async () => {
            const response = await request(app)
                .get('/api/v1/accounts/getAccountByUsername/Omar')
                .expect(200);

            expect(response.body).toHaveProperty('account');
            expect(response.body.account).toHaveProperty('id');
            expect(response.body.account).toHaveProperty('username');
            expect(response.body.account).toHaveProperty('funds');
            expect(response.body.account.username).toBe('Omar');
        });

        it('should return 404 when username does not exist', async () => {
            const response = await request(app)
                .get('/api/v1/accounts/getAccountByUsername/NonExistentUser')
                .expect(404);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Account not found');
        });
    });

    // Test POST /createAccount
    describe('POST /createAccount', () => {
        it('should create a new account with valid data', async () => {
            const newAccount = {
                username: 'TestUser',
                funds: 50
            };

            const response = await request(app)
                .post('/api/v1/accounts/createAccount')
                .send(newAccount)
                .expect(201);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Account created successfully');
            expect(response.body).toHaveProperty('account');
            expect(response.body.account.username).toBe(newAccount.username);
            expect(response.body.account.funds).toBe(newAccount.funds);
            expect(response.body.account).toHaveProperty('id');
        });

        it('should return 400 when username is missing', async () => {
            const response = await request(app)
                .post('/api/v1/accounts/createAccount')
                .send({ funds: 50 })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Username and funds are required');
        });

        it('should return 400 when funds is missing', async () => {
            const response = await request(app)
                .post('/api/v1/accounts/createAccount')
                .send({ username: 'TestUser' })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Username and funds are required');
        });

        it('should return 400 when both username and funds are missing', async () => {
            const response = await request(app)
                .post('/api/v1/accounts/createAccount')
                .send({})
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Username and funds are required');
        });
    });

    // Test PUT /updateAccount/:id
    describe('PUT /updateAccount/:id', () => {
        it('should update an existing account with valid data', async () => {
            const updatedData = {
                username: 'UpdatedUser',
                funds: 200
            };

            const response = await request(app)
                .put('/api/v1/accounts/updateAccount/1')
                .send(updatedData)
                .expect(200);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Account updated successfully');
            expect(response.body).toHaveProperty('account');
            expect(response.body.account.username).toBe(updatedData.username);
            expect(response.body.account.funds).toBe(updatedData.funds);
            expect(response.body.account.id).toBe(1);
        });

        it('should return 404 when account id does not exist', async () => {
            const updatedData = {
                username: 'UpdatedUser',
                funds: 200
            };

            const response = await request(app)
                .put('/api/v1/accounts/updateAccount/999')
                .send(updatedData)
                .expect(404);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Account not found');
        });

        it('should return 400 when username is missing', async () => {
            const response = await request(app)
                .put('/api/v1/accounts/updateAccount/1')
                .send({ funds: 200 })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Username and funds are required');
        });

        it('should return 400 when funds is missing', async () => {
            const response = await request(app)
                .put('/api/v1/accounts/updateAccount/1')
                .send({ username: 'UpdatedUser' })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Username and funds are required');
        });
    });

    // Test DELETE /deleteAccount/:id
    describe('DELETE /deleteAccount/:id', () => {
        it('should delete an existing account', async () => {
            // First, create an account to delete
            const newAccount = {
                username: 'ToDelete',
                funds: 10
            };

            const createResponse = await request(app)
                .post('/api/v1/accounts/createAccount')
                .send(newAccount)
                .expect(201);

            const accountId = createResponse.body.account.id;

            // Now delete it
            const deleteResponse = await request(app)
                .delete(`/api/v1/accounts/deleteAccount/${accountId}`)
                .expect(200);

            expect(deleteResponse.body).toHaveProperty('message');
            expect(deleteResponse.body.message).toBe('Account deleted successfully');
            expect(deleteResponse.body).toHaveProperty('account');
            expect(deleteResponse.body.account.id).toBe(accountId);

            // Verify it's deleted by trying to get it
            await request(app)
                .get(`/api/v1/accounts/getAccount/${accountId}`)
                .expect(404);
        });

        it('should return 404 when account id does not exist', async () => {
            const response = await request(app)
                .delete('/api/v1/accounts/deleteAccount/999')
                .expect(404);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Account not found');
        });
    });
});

