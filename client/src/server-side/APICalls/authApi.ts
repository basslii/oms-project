import { IUser } from '../../../../server/src/server/users/entities/user.entity';
import { IAuth } from '../../../../server/src/server/auth1/entities/auth.entity'
import axios from 'axios';
import { RegistrationStatus } from '../../../../server/src/server/auth1/auth.service';

export const setCurrentUserId = (user: IUser | null) => {
    if (user) {
        localStorage.setItem("currentUserId", user!.id!.toString())
    } else {
        localStorage.setItem("currentUserId", '')
    }
}

export const setCurrentUserToken = (token: string | null) => {
    if (token) {
        localStorage.setItem("currentUserToken", token!)
    } else {
        localStorage.setItem("currentUserToken", '')
    }
}

export const getCurrentUserId = (): number => {
    return +localStorage.getItem("currentUserId")!
}

export const getCurrentUserToken = (): string | null => {
    return localStorage.getItem("currentUserToken")
}

export const createAuthUser = async (user: IUser): Promise<IAuth> => {
    const response = await axios({
        method: 'post',
        url: '/api/auth/signin',
        data: {
            email: user.email,
            password: user.password,
        }
    })
    return response.data;

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
    return response.data;
}