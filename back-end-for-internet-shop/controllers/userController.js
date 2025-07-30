import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'No user found' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'Registered successfully',
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser || existingUser.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    req.session.user = {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email
    };
    req.json({message: 'Login successful', user: req.session.user});
};

export const requireAuth = async (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
};

export const getCurrentUser = async (req, res) => {
    if (!req.session.user) {
        res.json(req.session.user);
    }else{
        res.status(400).json({message: 'Not authenticated'});
    }
};

export const logoutUser = async (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out' });
    });
}