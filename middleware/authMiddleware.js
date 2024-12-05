const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Assuming token is stored in cookies

    if (!token) {
        return res.redirect('/login?message=Please login first');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.redirect('/login?message=Session expired, please login again');
        }
        req.user = user; // Add user info to the request
        next();
    });
};
