import { SetMetadata } from "@nestjs/common/decorators/core/set-metadata.decorator";
import { Role } from "@prisma/client";

export const ROLES_KEY = 'role';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)