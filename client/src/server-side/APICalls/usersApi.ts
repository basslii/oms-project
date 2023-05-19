import { IUser } from "../../../../server/src/server/users/entities/user.entity";
import axios from "axios";
import { RegistrationStatus } from '../../../../server/src/server/auth/auth.service'

// const params = {
//     filter: 'recent',
//     page: 1
// }

export const getAllUsers = async (params?: any): Promise<IUser[]> => {
    const response = await axios.get('/api/users', { params })

    const { password, ...results } = response.data;
    return results;
};

export const createUser = async (user: IUser): Promise<RegistrationStatus> => {
    const newUser = await axios({
        method: 'post',
        // url: '/api/users',
        url: '/api/auth/register',
        data: {
            username: user.username,
            password: user.password,
            email: user.email,
        }
    })

    const { password, ...results } = newUser.data;
    return results;
}

export const getUserById = async (userId: number): Promise<IUser> => {
    const response = await axios.get(`/api/users/${userId}`)
    const { password, ...results } = response.data;
    return results;
}

export const getUserByUsername = async (username: string): Promise<IUser | null> => {
    const response = await axios.get(`/api/users`)
    const userDb = response.data.find((data: IUser) => data.username === username);
    const { password, ...results } = userDb;
    return results;

}

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    const response = await axios.get(`/api/users`)
    const userDb = response.data.find((data: IUser) => data.email === email)
    const { password, ...results } = userDb;
    return results;
}

// export const validateSignIn = async (email: string, pass: string): Promise<IUser | null> => {
//     try {
//         const req = await axios({
//             method: 'post',
//             url: `/api/auth/validate`,
//             data: {
//                 email, password: pass
//             }
//         })
//         const { password, ...results } = req.data;
//         return results;
//     } catch (error) {
//         return null;
//     }
// }

export const createAccessToken = async (): Promise<string> => {
    return "create jwt token here and post to /auth/signin endpoint"
}