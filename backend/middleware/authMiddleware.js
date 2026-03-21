const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer')) {
        try {
            token = token.split(' ')[1];
            
            if (!token || token === 'null' || token === 'undefined') {
                 console.warn('[AUTH] Invalid token string:', token);
                 return res.status(401).json({ message: 'Not authorized, invalid token' });
            }

            const secret = process.env.JWT_SECRET || 'fallback-secret';
            const decoded = jwt.verify(token, secret);
            req.adminId = decoded.id;
            next();
        } catch (error) {
            console.error('Auth check error:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }


    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
