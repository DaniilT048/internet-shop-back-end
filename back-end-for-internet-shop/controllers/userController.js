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
