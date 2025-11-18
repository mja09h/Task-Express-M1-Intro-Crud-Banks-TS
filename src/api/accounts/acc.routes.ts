import express from "express";
import { getAllAccounts, getAccountById, getAccountByUsername, createAccount, deleteAccount, updateAccount } from "./acc.controller";

const accRouter = express.Router();

accRouter.get('/allAccounts', getAllAccounts);
accRouter.get('/getAccount/:id', getAccountById);
accRouter.get('/getAccountByUsername/:username', getAccountByUsername);
accRouter.post('/createAccount', createAccount);
accRouter.delete('/deleteAccount/:id', deleteAccount);
accRouter.put('/updateAccount/:id', updateAccount);

export default accRouter;