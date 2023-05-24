"user client";

import { IUser } from '../../../server/src/server/users/entities/user.entity'
import { Suspense, lazy, useEffect, useState } from 'react';
import { getAllUsers } from '../server-side/APICalls/usersApi'
// import UserInfo from '../userInfo/userInfo';
// import EmployeeInfo from '../employeeInfo/employeeInfo';
// import StepIndicator from '../stepIndicator/stepIndicator';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Layout from '@/components/layout';
import LoadingSpinner from '@/components/loadingSpinner';

const SignInComponent = lazy(() => import('./signin'));
const UserInfoComponent = lazy(() => import('./userInfo'));
const EmployeeInfoComponent = lazy(() => import('./employeeInfo'));

export default function SignUp() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [nextSignUpStep, setNextSignUpStep] = useState<number>(0);

    const router = useRouter()

    useEffect(() => {
        // get users that have already been created
        async function loadAllUsers() {
            await getAllUsers().then((data: IUser[]) => {
                setUsers(data)
            });
        }

        loadAllUsers();
    }, [])

    function handleNextStep() {
        setNextSignUpStep(nextSignUpStep + 1);
    }

    const handleSigninClick = () => {
        router.push('/')
    }

    return (
        <Layout>
            <Head>
                <title>sign up</title>
            </Head>
            <div className="signup-container">
                <div>
                    {nextSignUpStep === 0 &&
                        <Suspense fallback={<LoadingSpinner />}>
                            <UserInfoComponent onNextStep={handleNextStep} />
                        </Suspense>
                    }
                    {nextSignUpStep === 1 &&
                        <Suspense fallback={<LoadingSpinner />}>
                            <EmployeeInfoComponent onDone={handleSigninClick} />
                        </Suspense>
                    }
                    <div className="CTA">
                        <Link href="/" className='switch'>I already have an OMS account</Link>
                    </div>
                </div>
            </div>
        </Layout >

    )
}