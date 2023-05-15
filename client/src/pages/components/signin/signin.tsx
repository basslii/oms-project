"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IUser } from '../../../../../server/src/server/users/entities/user.entity';
import { validateSignIn } from '@/server-side/APICalls/usersApi';
import { Suspense, useState } from 'react';
import { IAlertOptions, alertService } from '@/server-side/APICalls/alertApi';
import router from 'next/router';
import { createAuthUser, setCurrentUserId, setCurrentUserToken } from '@/server-side/APICalls/authApi';
import Head from 'next/head';
import Layout from '../shared/layout/layout'
import LoadingSpinner from '../shared/loadingSpinner/loadingSpinner';
import { signIn, useSession } from "next-auth/react";

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
        // .matches(
        //     /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        //     "Password must contain at least 8 characters, one uppercase, one number and one special case character"
        // ),
    });

    const onSubmit = async (value: { email: string, password: string }) => {
        await createAuthUser(value)
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

    const assignUserJwtToken = async (user: IUser): Promise<void> => {
        await createAuthUser(user).then(async (authUser) => {
            if (authUser) {
                console.log("authUser", authUser)
                // const res = await signIn("credentials", {
                //     redirect: false,
                //     email: 'balipanas97@gmail.com',
                //     password: 'B@zlightyear97',
                //     // callbackUrl,
                // })

                // console.log(res, "res in assignUserJwtToken")
                // if (!res?.error) {
                //     goToDashboardComponent();
                // } else {
                //     router.push(callbackUrl);
                //     // setError
                //     setWarningMessage(true);
                // }
            }
        })
    }

    const goToDashboardComponent = () => {
        router.push('/components/dashboard/dashboard')
        setIsSignedIn(true);
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
                    <a href="/components/signup/signup" className='switch'>create OMS account</a>
                </div>
            </Layout>
        </Suspense>

    )
}