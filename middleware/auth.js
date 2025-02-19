const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if(!token) {
        return res.status(401).json({message: "Access denied!"});
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET_KEY);
        req.user = decoded; // store decoded data in request object
        next();
    } catch (err) {
        res.status(401).json({message: "Invalid token"});
    }
};