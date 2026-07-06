import { cookieOptions } from "../config/config.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

export const register_user = wrapAsync(async (req, res, next) => {
    const { name, email, password } = req.body;
    const { token, user } = await registerUser(name, email, password)
    req.user = user;
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({ message: "Registration success" });
})

export const login_user = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password)    
    req.user = user;
    res.cookie("accessToken", token, cookieOptions)
    res.status(200).json({ user: user, message: "login success" });
})

export const logout_user = wrapAsync(async (req, res) => {
    res.clearCookie("accessToken", cookieOptions)
    res.status(200).json({ message: "logout success" })
})

export const createCustomShortUrl = wrapAsync(async (req, res) => {
    const { url, slug } = req.body;
    const shortUrl = await createShortUrlWithoutUser(url, req.user._id);
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl })
})

export const get_current_user = wrapAsync(async (req, res) => {
    res.status(200).json({ user: req.user })
})
