import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { IUser } from "src/server/users/entities/user.entity";
import { ExecutionContext } from "@nestjs/common";

export class SessionSerializer extends PassportSerializer {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async serializeUser(user: IUser, done: (err, user: IUser) => void) {
        done(null, user);
    }

    async deserializeUser(user: IUser, done: (err?: any, req?: any, res?: any, user?: IUser) => void) {
        const userDb = await this.authService.validateUser(user.email, user.password)
        return userDb ? done(null, userDb) : done(null, null)
    }


}