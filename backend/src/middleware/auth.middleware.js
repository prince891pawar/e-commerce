const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    // 1. Check header exist
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    try {
        // 3. Verify token
        const decoded = jwt.verify(token, process.env.SCRETE_KEY);

        // 4. Save user
        req.user = decoded;

        console.log("TOKEN:", token);
        console.log("DECODED:", decoded);

        next();
    } catch (error) {
        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid token hai"
        });
    }
}

module.exports = authMiddleware;