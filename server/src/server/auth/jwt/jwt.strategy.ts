import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "src/server/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT,
            ]),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        })
    }

    private static extractJWT(req: Request): string | null {
        if (req.cookies && 'token' in req.cookies) {
            return req.cookies.token
        }
        return null;
    }

    async validate(payload: { id: number, email: string }) {
        const user = await this.usersService.findUserByEmail(payload.email);
        const { id, email, username, ...others } = user
        return !user ? new UnauthorizedException() : { id, email, username };
    }
}