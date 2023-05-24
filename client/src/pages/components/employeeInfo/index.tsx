import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IEmployee } from "../../../../../server/src/server/employees/entities/employee.entity"
import { useEffect, useState } from 'react';
import { getCurrentUserId } from '@/server-side/APICalls/authApi';
import { createUserEmployee } from '@/server-side/APICalls/employeeApi';
import { IAlertOptions, alertService } from '@/server-side/APICalls/alertApi';

interface IEmployeeInfoProps {
    onDone: () => void;
}
export default function EmployeeInfo({ onDone }: IEmployeeInfoProps) {
    const [currentUserId, setCurrentUserId] = useState<number>(0);
    const initialValues = { firstname: '', lastname: '', phone_number: '', image_url: '', image_type: '' }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const MAX_FILE_SIZE: number = 2097152; //100KB
    const validFileExtensions = { image: ['jpg', 'png', 'jpeg'] };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('Please enter your first name'),
        lastname: Yup.string().required('Please enter your last name'),
        phone_number: Yup.string().required('Please enter your phone number').matches(phoneRegExp, 'Phone number is not valid'),
    });

    useEffect(() => {
        // get users that have already been created

        async function loadCurrentUser() {
            console.log("getCurrentUserId", +getCurrentUserId())
            setCurrentUserId(+getCurrentUserId())
        }

        loadCurrentUser();
    }, [])

    function onSubmit(values: IEmployee, { setSubmitting, resetForm }: any) {
        createUserEmployee(values, currentUserId).subscribe(() => {
            setSubmitting(false);
            resetForm();
            onDone();

            const options: IAlertOptions = {
                autoClose: true,
                keepAfterRouteChange: true
            }
            alertService.success('Successfully added new User to System', options)
        })
    };

    return (
        <div className="formGroup center">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className='form-group'>
                            <label className="inputText" htmlFor="firstname">First Name:</label>
                            <Field className="inputField" type="text" name="firstname" id="firstname" />
                            <div className="danger">
                                <ErrorMessage name="firstname" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className="inputText" htmlFor="lastname">Last Name:</label>
                            <Field className="inputField" type="text" name="lastname" id="lastname" />
                            <div className="danger">
                                <ErrorMessage name="lastname" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className="inputText" htmlFor="phone_number">Phone Number:</label>
                            <Field className="inputField" type="text" name="phone_number" id="phone_number" />
                            <div className="danger">
                                <ErrorMessage name="phone_number" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className="inputText" htmlFor="image">Image:</label>
                            <Field className="inputField" type="file" name="image" id="image" />
                            <div className="danger">
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <div className="center button-container">
                            <button className="button-primary" type="submit" disabled={isSubmitting}>
                                next
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

EmployeeInfo.displayName = 'Employee Info';