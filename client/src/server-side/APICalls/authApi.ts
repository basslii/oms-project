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

export const createAuthUser = async (user: IUser): Promise<IAuth> => {
    const response = await axios({
        method: 'post',
        url: '/api/auth/signin',
        data: {
            email: user.email,
            password: user.password,
        }
    })
    const { password, ...results } = response.data;
    return results;

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