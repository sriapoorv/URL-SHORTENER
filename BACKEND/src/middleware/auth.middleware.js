import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) throw res.status(401).json({message: "Unauthorized"});
    try {
        const decoded = verifyToken(token);
        const user = await findUserById(decoded)
        if(!user) return res.status(401).json({message: "Unauthorised"})
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({message: "Unauthorised"});
    }
}