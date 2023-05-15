import { IUser } from "../../../../server/src/server/users/entities/user.entity";
import axios from "axios";
import { RegistrationStatus } from '../../../../server/src/server/auth1/auth.service'

// const params = {
//     filter: 'recent',
//     page: 1
// }

export const getAllUsers = async (params?: any): Promise<IUser[]> => {
    const response = await axios.get('/api/users', { params })
    return response.data
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
    return newUser.data;
}

export const getUserById = async (userId: number): Promise<IUser> => {
    const response = await axios.get(`/api/users/${userId}`)
    return response.data

}

export const getUserByUsername = async (username: string): Promise<IUser | null> => {
    const response = await axios.get(`/api/users`)
    return response.data.find((data: IUser) => data.username === username)
}

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    const response = await axios.get(`/api/users`)
    return response.data.find((data: IUser) => data.email === email)
}

export const validateSignIn = async (email: string, password: string): Promise<IUser | null> => {
    try {
        const req = await axios({
            method: 'post',
            url: `/api/auth/validate`,
            data: {
                email, password
            }
        })
        return req.data;
    } catch (error) {
        return null;
    }
}

export const createAccessToken = async (): Promise<string> => {
    return "create jwt token here and post to /auth/signin endpoint"
}