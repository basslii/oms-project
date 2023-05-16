import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";


export class SessionSerializer extends PassportSerializer {
    constructor(private readonly authService: AuthService) {
        super();
    }
    async serializeUser(user: any, done: Function) {
        done(null, user)
    };

    deserializeUser(payload: any, done: Function) {
        done(null, payload)
    }
}