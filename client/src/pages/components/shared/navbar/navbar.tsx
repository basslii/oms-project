import router from 'next/router';
import { useEffect, useState } from 'react';
import { GoSignOut } from 'react-icons/go';
import { TbUserCircle } from 'react-icons/tb';
import { IUser } from '../../../../../../server/src/server/users/entities/user.entity';
import { getUserById } from '@/server-side/APICalls/usersApi';
import { getCurrentUserId, loggingOut } from '@/server-side/APICalls/authApi';
import Image from 'next/image';
import { IAlertOptions, alertService } from '@/server-side/APICalls/alertApi';
import { getSession, useSession } from 'next-auth/react';

type NavbarProps = {
    setIsSignedIn: (isSignedIn: boolean) => void,
    isSignedIn: boolean,
}

export default function Navbar({ setIsSignedIn, isSignedIn }: NavbarProps) {
    const [user, setUser] = useState<IUser>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const session = useSession()

    // useEffect(() => {
    //     async function loadUser(id: number) {
    //         await getUserById(id).then(data => setUser(data))
    //     }

    //     const id: number = getCurrentUserId();
    //     if (id) {
    //         loadUser(id)
    //     };
    // }, [])

    const handleSignOut = () => {
        loggingOut().then(async () => {
            const options: IAlertOptions = {
                autoClose: true,
                keepAfterRouteChange: true
            }
            await goToSignInPage();
            alertService.warn('You have successfully signed out', options)
            console.log(session, "session");
        })

    }

    const goToSignInPage = async () => {
        await router.push('/');
        setIsSignedIn(false)
    }

    const toggle = () => {
        setIsOpen(open => !open);
    }

    // const transClass = isOpen ? "display: block" : "display: hidden";

    return (
        <>
            {session.data && isSignedIn
                ?
                <div className="navbar-container">
                    <div className="logo">
                        <h1 style={{ fontSize: '30px' }}>OMS</h1>
                        {/* <Image src="/oms-logo-2.png" alt="logo" width="64" height="64" /> */}
                    </div>
                    <div className="navbar-container-items">
                        <div className="item"><a href='/components/dashboard/dashboard'>dashboard</a></div>
                        <div className="item"><a href='#'>leaves</a></div>
                        <div className="item"><a href='#'>room management</a></div>
                        <div className="item"><a href='#'>roles & rights</a></div>
                        <div className="item"><a href='#'>reservations</a></div>
                    </div>
                    <button className="profile-container" onClick={toggle}>
                        <div className="profile-items" style={isOpen ? { borderRadius: '16px', boxShadow: '0 8px 20px rgba(255, 255, 255, 0.5)' } : {}}>
                            <div className="container-profile-image">
                                <Image src="/default-user.png" alt="profile-img" width="30" height="30" />
                            </div>
                            <div className="profile-container-user-info">
                                <h1>Username: {user?.username}</h1>
                                <h1>Email: {user?.email}</h1>
                            </div>
                        </div>
                    </button>
                    <div className='profile-dropdown' style={isOpen ? { display: 'block' } : { display: 'none' }}>
                        <ul>
                            <li>
                                <a className="button-item-icons hover-top-item" href=''>
                                    {/* <a href=""> */}
                                    My Profile
                                    <div className="icon">
                                        <TbUserCircle />
                                    </div>
                                    {/* </a> */}
                                </a>
                            </li>
                            <li>
                                <button onClick={handleSignOut}>
                                    <div className="button-item-icons">
                                        Sign out
                                        <div className="icon">
                                            <GoSignOut />
                                        </div>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button onClick={handleSignOut}>
                                    <div className="button-item-icons">
                                        Sign out
                                        <div className="icon">
                                            <GoSignOut />
                                        </div>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                : null}
        </>
    )
}