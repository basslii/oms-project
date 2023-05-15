import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from '../auth.service';

export interface JwtPayload { email: string, password: string }


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const user = await this.authService.validateUser(payload.email, payload.password);
        if (!user) {
            throw new HttpException('Invalid token',
                HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}