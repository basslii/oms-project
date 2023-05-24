import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IUser, } from '../../../server/src/server/users/entities/user.entity'
import { createUser } from '../server-side/APICalls/usersApi'
import { registerUser, setCurrentUserId } from '@/server-side/APICalls/authApi';
import { RegistrationStatus } from '../../../server/src/server/auth/auth.service';

interface IUserInfoProps {
    onNextStep: () => void;
}

export default function UserInfo({ onNextStep }: IUserInfoProps) {
    const initialValues = { username: '', email: '', password: '', confirmPassword: '' }

    const validationSchema = Yup.object({
        username: Yup.string().required('Please enter your name'),
        email: Yup.string().email('Invalid email address').required('Please enter your email'),
        password: Yup
            .string()
            .required("Please enter your password")
            .matches(
                /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                "Password must contain at least 8 characters, one uppercase, one number and one special case character"
            ),
        confirmPassword: Yup
            .string()
            .required("Please confirm your password")
            .oneOf([Yup.ref('password'), ""], "Passwords don't match.")
    });

    function onSubmit(value: IUser, { setSubmitting, resetForm }: any): void {
        registerUser(value).then((value1: RegistrationStatus) => {
            console.log(value1, "data")
            setCurrentUserId(value1!.data!);
            setSubmitting(false);
            onNextStep();
            resetForm();
        })
    };
    return (
        <div className="formGroup center">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <div className='form-group'>
                            <label className="inputText" htmlFor="username">Username:</label>
                            <Field className="inputField" type="text" name="username" id="username" />
                            <div className="danger">
                                <ErrorMessage name="username" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className="inputText" htmlFor="email">Email:</label>
                            <Field className="inputField" type="text" name="email" id="email" />
                            <div className="danger">
                                <ErrorMessage name="email" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className="inputText" htmlFor="password">Password:</label>
                            <Field className="inputField" type="password" name="password" id="password" />
                            <div className="danger">
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className="inputText" htmlFor="confirmPassword">Confirm Password:</label>
                            <Field className="inputField" type="password" name="confirmPassword" id="confirmPassword" />
                            <div className="danger">
                                <ErrorMessage name="confirmPassword" />
                            </div>
                        </div>
                        <div className="center button-container">
                            <button className="button-primary" type="submit" disabled={isSubmitting}>
                                Next
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

UserInfo.displayName = 'User Info';