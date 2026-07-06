import { createUser, findUserByEmail, findUserByEmailByPassword } from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async (name, email, password) => {
    try {
        const user = await findUserByEmail(email)
        if (user) throw new ConflictError("User already exists")
        const newUser = await createUser(
            name,
            email,
            password,
        )
        const token = signToken({ id: newUser._id })
        return { token, newUser }
    } catch (err) {
        throw err;
    }
}
export const loginUser = async (email, password) => {
    try {
        const user = await findUserByEmailByPassword(email);
        if (!user) throw new Error("User not found");

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) throw new Error("Invalid email or password");

        const token = signToken({ id: user._id });

        return { token, user };
    } catch (err) {
        throw err;
    }
}

//check once