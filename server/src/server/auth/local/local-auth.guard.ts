import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express"

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    async canActivate(context: ExecutionContext) {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();

        await super.logIn(request)
        return result;
    }
}

// To Protect endpoint 
// User must sign in first then  only can access endpoint
@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<any> {
        const request = context.switchToHttp().getRequest<Request>();
        return request.isAuthenticated()
    }
}