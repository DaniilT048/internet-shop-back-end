import express from 'express';
import { registerUser } from '../../controllers/userController.js';

const register = express.Router();

register.post('/api/register', registerUser);

export default register;
