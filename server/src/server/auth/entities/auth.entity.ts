// import { JwtSignOptions } from "@nestjs/jwt"
import { IUser } from "src/server/users/entities/user.entity"

export interface IAuth {
    id?: number
    token?: string
    user?: IUser
}

export class Auth implements IAuth {
    constructor(
        id?: number,
        token?: string,
        user?: IUser
    ) { }
}

// export function getAuthIdentification(auth: IAuth): number | undefined | null {
//     return auth.id!
// }
