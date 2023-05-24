"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IUser } from '../../../server/src/server/users/entities/user.entity';
import { Suspense, useState } from 'react';
import { IAlertOptions, alertService } from '@/server-side/APICalls/alertApi';
import router from 'next/router';
import { signInUser, getAppSession } from '@/server-side/APICalls/authApi';
import Head from 'next/head';
import Layout from './components/layout'
import LoadingSpinner from './components/loadingSpinner';

type SignInProps = {
    setIsSignedIn: (isSignedIn: boolean) => void;
}

export default function SignIn({ setIsSignedIn }: SignInProps) {
    const initialValues = { email: '', password: '' };
    const [warningMessage, setWarningMessage] = useState<boolean>(false)

    // const { data: session, status } = useSession();
    // console.log(session, status, "session and status")

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Please enter your email'),
        password: Yup
            .string()
            .required("Please enter your password")
    });

    const onSubmit = async (value: { email: string, password: string }) => {
        await signInUser(value)
            .then(() => onSuccess().then(() => goToDashboardComponent()))
            .catch(err => {
                onError();
                throw new Error(err);
            })
    }

    const onSuccess = async (): Promise<void> => {
        setWarningMessage(false)
        const options: IAlertOptions = {
            autoClose: true,
            keepAfterRouteChange: true
        }
        alertService.success('You have successfully signed in', options)
    }

    const onError = async () => {
        setWarningMessage(true)
        const options: IAlertOptions = {
            autoClose: true,
            keepAfterRouteChange: true
        }
        alertService.error('There is a problem with signing in', options)
    }

    const goToDashboardComponent = async () => {
        await getAppSession().then(() => {
            router.push('/dashboard')
            setIsSignedIn(true);
        })
    }

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Layout>
                <Head>
                    <title>sign in</title>
                </Head>
                <div className="formGroup">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
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
                                {
                                    warningMessage ? (
                                        <div className="center warning-text">
                                            <div className="danger">
                                                <p>invalid password or email!</p>
                                            </div>
                                        </div>

                                    )
                                        : null
                                }

                                <div className="center button-container">
                                    <button className="button-primary" type="submit" disabled={isSubmitting}>
                                        Sign In
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="CTA">
                    <a href="/signup" className='switch'>create OMS account</a>
                </div>
            </Layout>
        </Suspense>

    )
}