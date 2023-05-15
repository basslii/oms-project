import { IAuth } from "src/server/auth/entities/auth.entity";
import { IEmployee } from "src/server/employees/entities/employee.entity";
import Role from "../../../../prisma/lib/prisma";

export interface IUser {
    id?: number;
    email?: string;
    password?: string;
    username?: string;
    createdAt?: Date;
    updatedAt?: Date;
    employee?: IEmployee;
    auth?: IAuth[];
    role?: typeof Role;
    isLoading?: boolean;
}

export class User implements IUser {
    constructor(
        id?: number,
        email?: string,
        password?: string,
        username?: string,
        createdAt?: Date,
        updatedAt?: Date,
        employee?: IEmployee,
        auth?: IAuth[],
        role?: typeof Role,
        isLoading?: boolean,

    ) { }
}

export function getUserIdentification(User: IUser): number | undefined | null {
    return User.id!
}
