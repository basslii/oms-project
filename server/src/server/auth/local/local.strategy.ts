import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: "email",
            // "passwordField": "password",
        });
    }

    async validate(email: string, pass: string) {
        const user = await this.authService.validateUser(email, pass);
        const { password, ...results } = user
        return !user ? new UnauthorizedException() : results;
    }
}