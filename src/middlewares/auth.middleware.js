const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({error: "No token provided"});
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Trust verified JWT (id + role); avoids a DB round-trip per request.
        // Revocation is by expiry or future token blacklist if needed.
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (err) {
        return res.status(401).json({ error: "Unauthorized: " + err.message });
    }
};

const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user) return res.status(401).json({error: "Unauthorized"});
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({error: "Forbidden"});
        }
        next();
    };
};

module.exports = { authenticate, authorize };