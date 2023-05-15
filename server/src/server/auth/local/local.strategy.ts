import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, password: string) {
        console.log("validate in localAuthGuard")
        const user = await this.authService.validateUser(email, password);
        console.log("user in localAuthGuard", user)
        if (!user) {
            return new UnauthorizedException()
        }

        return user;
    }
}