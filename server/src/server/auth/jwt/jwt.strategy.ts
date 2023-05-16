import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

// export interface JwtPayload { email: string, password: string }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: process.env.JWT_SECRET,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any): Promise<any> {
        const { password, ...results } = payload.sub;
        return results;
    }
}