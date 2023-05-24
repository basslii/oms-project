import { getSession, useSession } from "next-auth/react"

type FooterProps = {
    setIsSignedIn: (isSignedIn: boolean) => void,
    isSignedIn?: boolean,
}

export default function Footer({ setIsSignedIn, isSignedIn }: FooterProps) {

    const session = useSession();
    return (
        <>
            {
                session.data && isSignedIn ?
                    <div className="footer-container">
                        <h1>This is Footer container</h1>
                    </div> :
                    null
            }
        </>
    )
}