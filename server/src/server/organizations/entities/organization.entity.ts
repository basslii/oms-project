import { IUser } from "src/server/users/entities/user.entity"

export interface IOrganization {
    id?: number;
    name?: string;
    cost_center?: string;
    organization_leader?: IUser;
    assistant?: IUser;
    sub_assistant?: IUser;
    employees?: IUser[];
}

export class Organization implements IOrganization {
    constructor(
        id?: number,
        name?: string,
        cost_center?: string,
        organization_leader?: IUser,
        assistant?: IUser,
        sub_assistant?: IUser,
        employees?: IUser[]
    ) { }
}

export function getOrganizationIdentification(org: IOrganization): number | undefined | null {
    return org.id!
}
