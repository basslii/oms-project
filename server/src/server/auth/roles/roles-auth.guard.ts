import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import { ROLES_KEY } from "./roles.decorator";
import { Observable } from "rxjs";

@Injectable()
export class RolesAuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        throw new Error("Method not implemented.");
    }

    CanActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) return true
        const { user } = context.switchToHttp().getRequest();
        console.log(requiredRoles.some(role => user.roles?.includes(role)))
        return requiredRoles.some(role => user.roles?.includes(role));
    }
}