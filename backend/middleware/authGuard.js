import jwt from 'jsonwebtoken';

const authGuard = (req, res, next) => {
    try {
        const authToken = req.header('Authorization')?.split(' ')[1]; 
        if (!authToken) return res.status(401).json({ message: "Токен не предоставлен" });

        jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (error, userData) => {
            if (error) return res.status(403).json({ message: "Недействительный токен" });

            req.user = userData;
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
};

export default authGuard; 