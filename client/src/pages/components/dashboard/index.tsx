import { Suspense, lazy, useEffect } from "react";
import { getCurrentUserId, getCurrentUserToken } from "@/server-side/APICalls/authApi";
import LoadingSpinner from "../shared/loadingSpinner";
import TableComponent from "../shared/table/table";
import { IUser } from "../../../../../server/src/server/users/entities/user.entity";
import { getSession, useSession } from "next-auth/react";
import NonAuthenticatedPage from "../shared/NonauthenticatedPage";
import router from 'next/router';

const SharedCalendar = lazy(() => import("../shared/calendar/calendar"))
const SharedPieChart = lazy(() => import("../shared/piechart/piechart"))
const SharedTableComponent = lazy(() => import("../shared/table/table"))
const UserStatus = lazy(() => import("../shared/userStatus/userstatus"))

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

    useEffect(() => {
        const currentToken: string = getCurrentUserToken()!;
        const currentUserId: number = getCurrentUserId();
        setIsSignedIn(true);

        if (!session) {
            goToSignInPage()
        }

    })

    const goToSignInPage = () => {
        router.push('/')
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