import express from 'express';
import {getCurrentUser, loginUser, logoutUser, registerUser, requireAuth} from '../../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/api/register', registerUser);
userRoutes.post('/api/login', loginUser);
userRoutes.post('/api/logout', logoutUser);
userRoutes.get('/api/current-user', requireAuth, getCurrentUser);

export default userRoutes;
