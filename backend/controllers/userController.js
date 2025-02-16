import UserModel from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import JwtService from '../utils/JwtService.js';
import validator from 'validator';

class UserController {
    async register(req, res) {
        try {
            const { userName, userEmail, userPassword } = req.body;

            if (!userName || !userEmail || !userPassword) {
                return res.status(400).json({ message: "Заполните все поля" });
            }
            if (!validator.isEmail(userEmail)) {
                return res.status(400).json({ message: "Неверный формат email" });
            }
            if (userPassword.length < 6) {
                return res.status(400).json({ message: "Пароль должен быть не менее 6 символов" });
            }

            const userExists = await UserModel.findOne({ userEmail });
            if (userExists) {
                return res.status(400).json({ message: "Пользователь с таким email уже существует" });
            }

            const passwordHash = await bcrypt.hash(userPassword, 4);

            const newUser = new UserModel({ 
                userName, 
                userEmail, 
                userPassword: passwordHash 
            });
            await newUser.save();

            const accessToken = JwtService.generateAccessToken({ id: newUser._id });
            const refreshToken = JwtService.generateRefreshToken({ id: newUser._id });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ 
                accessToken, 
                user: { 
                    id: newUser._id, 
                    userName, 
                    userEmail 
                } 
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }

    async login(req, res) {
        try {
            const { userEmail, userPassword } = req.body;

            if (!userEmail || !userPassword) {
                return res.status(400).json({ message: "Заполните все поля" });
            }
            if (!validator.isEmail(userEmail)) {
                return res.status(400).json({ message: "Неверный формат email" });
            }

            const user = await UserModel.findOne({ userEmail });
            if (!user) {
                return res.status(400).json({ message: "Пользователь не существует" });
            }

            const isMatching = await bcrypt.compare(userPassword, user.userPassword);
            if (!isMatching) {
                return res.status(400).json({ message: "Неверный пароль" });
            }

            const accessToken = JwtService.generateAccessToken({ id: user._id });
            const refreshToken = JwtService.generateRefreshToken({ id: user._id });

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ 
                accessToken, 
                user: { 
                    id: user._id, 
                    userName: user.userName, 
                    userEmail: user.userEmail 
                } 
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }
}

export default new UserController();
