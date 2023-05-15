import { IUser } from "src/server/users/entities/user.entity"

export interface IEmployee {
    id?: number
    firstname?: string
    lastname?: string
    phone_number?: string
    image_url?: string
    image_type?: string
    user?: IUser
}

export class Employee implements IEmployee {
    constructor(
        id?: number,
        firstname?: string,
        lastname?: string,
        phone_number?: string,
        image_url?: string,
        image_type?: string,
        user?: IUser
    ) { }
}

export function getEmployeeIdentification(employee: IEmployee): number | undefined | null {
    return employee.id!
}
