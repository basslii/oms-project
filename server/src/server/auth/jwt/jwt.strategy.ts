import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService
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
        return payload;
    }
}