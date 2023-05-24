import { getSession, useSession } from "next-auth/react"

type FooterProps = {
    setIsSignedIn: (isSignedIn: boolean) => void,
}

export default function Footer({ setIsSignedIn }: FooterProps) {

    const session = useSession();
    return (
        <>
            {
                session ?
                    <div className="footer-container">
                        <h1>This is Footer container</h1>
                    </div> :
                    null
            }
        </>
    )
}