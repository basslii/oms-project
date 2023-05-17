import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { IUser } from "src/server/users/entities/user.entity";
import { ExecutionContext } from "@nestjs/common";

export class SessionSerializer extends PassportSerializer {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async serializeUser(user: IUser, done: (err, user: IUser) => void) {
        console.log("user is serialized", user)
        done(null, user);
    }

    async deserializeUser(user: IUser, done: (err?: any, req?: any, res?: any, user?: IUser) => void) {
        console.log("deserializeUser")
        console.log("user is deserialized", user)
        const userDb = await this.authService.validateUser(user.email, user.password)
        console.log(userDb, "userDb in deserializeUser")
        return userDb ? done(null, userDb) : done(null, null)
    }


}