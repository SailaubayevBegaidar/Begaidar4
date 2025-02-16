import jwt from 'jsonwebtoken';

class JwtService {
    generateAccessToken(userData) {
        return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    }

    generateRefreshToken(userData) {
        return jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }
}

export default new JwtService(); 