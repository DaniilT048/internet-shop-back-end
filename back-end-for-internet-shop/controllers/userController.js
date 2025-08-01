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
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, existingUser.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            req.session.user = {
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            };
            res.json({ message: 'Login successful', user: req.session.user });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    };

    export const requireAuth = async (req, res, next) => {
        if (req.session?.user?._id) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    };

    export const getCurrentUser = async (req, res) => {
        if (req.session.user) {
            res.json(req.session.user);
        } else {
            res.status(401).json({ message: 'Not authenticated' });
        }
    };

    export const logoutUser = async (req, res) => {
        if (req.session) {
            req.clearCookie('connect.sid');
            req.session.destroy(err => {
                if (err) {
                    res.status(400).send('Unable to log out');
                } else {
                    res.send('Logout successful');
                }
            });
        } else {
            res.end();
        }
    }