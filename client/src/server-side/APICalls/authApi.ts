import { IUser } from '../../../../server/src/server/users/entities/user.entity';
import { IAuth } from '../../../../server/src/server/auth/entities/auth.entity'
import axios from 'axios';
import { RegistrationStatus } from '../../../../server/src/server/auth/auth.service';

export const setCurrentUserId = (user: IUser | null) => {
    if (user) {
        sessionStorage.setItem("currentUserId", user!.id!.toString())
    } else {
        sessionStorage.setItem("currentUserId", '')
    }
}

export const setCurrentUserToken = (token: string | null) => {
    if (token) {
        sessionStorage.setItem("currentUserToken", token!)
    } else {
        sessionStorage.setItem("currentUserToken", '')
    }
}

export const getCurrentUserId = (): number => {
    return +sessionStorage.getItem("currentUserId")!
}

export const getCurrentUserToken = (): string | null => {
    return sessionStorage.getItem("currentUserToken")
}

export const signInUser = async (user: IUser) => {
    const response = await axios({
        method: 'post',
        url: '/api/auth/signin',
        data: {
            email: user.email,
            password: user.password,
        }
    })
    return response.data.message;
}
export const registerUser = async (user: IUser): Promise<RegistrationStatus> => {
    const response = await axios({
        method: 'post',
        url: '/api/auth/register',
        data: {
            username: user.username,
            email: user.email,
            password: user.password,
        }
    })
    const { password, ...results } = response.data;
    return results;
}

export const loggingOut = async () => {
    return axios.get('/api/auth/logout');
}

export const getAppSession = async () => {
    return axios.get('/api/auth/session');
}

export const validateUser = async (user: IUser) => {
    const response = await axios({
        method: 'post',
        url: '/api/auth/register',
        data: {
            username: user.username,
            email: user.email,
            password: user.password,
        }
    })
    const { password, ...results } = response.data;
    return results;
}