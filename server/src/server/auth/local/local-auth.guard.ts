import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { validate, validateOrReject } from "class-validator";
import { Request } from "express"
import { validateHeaderValue } from "http";

@Injectable()
export class RolesAuthGuard extends AuthGuard('local') {
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
        const request = context.switchToHttp().getRequest();
        console.log("isAuthenticated", request.isAuthenticated())
        // return request.sessionID !== '' ? true : false;
        return request.isAuthenticated();
    }
}