import { Suspense, lazy, useEffect } from "react";
import { getCurrentUserId, getCurrentUserToken } from "@/server-side/APICalls/authApi";
import { useSession } from "next-auth/react";
import router from 'next/router';
import LoadingSpinner from "@/components/loadingSpinner"
import UserStatus from "@/components/userstatus"
import NonAuthenticatedPage from "@/components/nonauthenticatedPage";

const SharedCalendar = lazy(() => import("../components/calendar"))
const SharedPieChart = lazy(() => import("../components/piechart"))
const SharedTableComponent = lazy(() => import("../components/table"))

type DashBoardProps = {
    setIsSignedIn: (isSignedIn: boolean) => void;
}

const data: any[] = [
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Bazli',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Yasmin',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Yasmin',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Yasmin',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Yasmin',
        status: 'WFH',
        desk: 'r.18'
    },
    {
        username: 'Yasmin',
        status: 'WFH',
        desk: 'r.18'
    },
]

export default function Dashboard({ setIsSignedIn }: DashBoardProps) {
    const session = useSession();
    console.log(session, "session")

    useEffect(() => {
        const currentToken: string = getCurrentUserToken()!;
        const currentUserId: number = getCurrentUserId();
        setIsSignedIn(true);

        if (session.status === "unauthenticated") {
            goToSignInPage();
        }

    })

    const goToSignInPage = () => {
        router.push('/signin')
    }

    return (
        <>
            {
                session
                    ?
                    <div className="dashboard-container">
                        <div className="dashboard-grid-view">
                            <div className="dashboard-calendar-item">
                                <div className="dashboard-title-box">
                                    <h1>Date Status</h1>
                                </div>
                                <Suspense fallback={<LoadingSpinner />}>
                                    <SharedCalendar />
                                </Suspense>
                            </div>
                            <div className="dashboard-userStatus-item">
                                <div className="dashboard-title-box">
                                    <h1>User Status</h1>
                                </div>
                                <Suspense fallback={<LoadingSpinner />}>
                                    <UserStatus />
                                </Suspense>
                            </div>
                            <div className="dashboard-placeStatus-item">
                                <div className="dashboard-title-box">
                                    <h1>Place Status</h1>
                                </div>
                                <div className="dashboard-piechart-box">
                                    <Suspense fallback={<LoadingSpinner />}>
                                        <SharedPieChart />
                                    </Suspense>

                                </div>
                            </div>
                        </div>
                        <div className="dashboard-body-view">
                            <SharedTableComponent data={data} />
                        </div>
                    </div>
                    : <NonAuthenticatedPage />
            }

        </>
    )
}