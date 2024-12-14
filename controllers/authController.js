const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res)=>{
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
        return res.redirect('/?message=All fields are required');
    }

    if (password !== confirmPassword) {
        return res.redirect('/?message=Passwords do not match');
    }

    try {
        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.redirect('/?message=User already exists');
        }

        const newUser = new User({ username, password });
        await newUser.save();

        res.redirect('/login?message=Registration successful, please login');
    } catch (error) {
        console.error(error);
        res.redirect('/?message=Server error, please try again');
    }
};

// Login user and generate a JWT token
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.redirect('/login?message=Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/home'); // Redirect to the dashboard/home page
    } catch (error) {
        console.error(error);
        res.redirect('/login?message=Server error, please try again');
    }
};
