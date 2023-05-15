import { Observable, from, map } from "rxjs";
import { IEmployee } from "../../../../server/src/server/employees/entities/employee.entity";
import axios from "axios";

export const getEmployeeDetail = async (emplpoyeeId: number, params?: any): Promise<IEmployee> => {
    const response = axios.get(`/api/users/${emplpoyeeId}`)
    return (await response).data;
}

export const createUserEmployee = (employee: IEmployee, currentUserId: number): Observable<IEmployee> => {
    // const response = await axios({
    //     method: 'post',
    //     url: '/api/employees',
    //     data: {
    //         firstname: employee.firstname,
    //         lastname: employee.lastname,
    //         phone_number: employee.phone_number,
    //         image_url: "",
    //         image_type: "",
    //         user: {
    //             id: currentUserId
    //         }
    //     }
    // })

    // return response.data;

    return from(
        axios({
            method: 'post',
            url: '/api/employees',
            data: {
                firstname: employee.firstname,
                lastname: employee.lastname,
                phone_number: employee.phone_number,
                image_url: "",
                image_type: "",
                user: {
                    id: currentUserId
                }
            }
        })
    ).pipe(
        map((response) => {
            return response.data
        })
    )
}