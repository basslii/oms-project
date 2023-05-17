import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUser } from "../../../../../server/src/server/users/entities/user.entity";
import { validateSignIn } from "@/server-side/APICalls/usersApi";
import { createAuthUser } from "@/server-side/APICalls/authApi";
import { IAuth } from "../../../../../server/src/server/auth/entities/auth.entity";
import NextAuth from "next-auth";

const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/components/signin/signin',
        signOut: '/components/signout/signout',
        error: 'auth/error'
    },
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // const { email, password } = credentials as { email: string, password: string };
                const res = await createAuthUser(credentials!)
                console.log(res, "res")
                if (!res) {
                    return null;
                };

                return {
                    id: res.user.id,
                    name: res.user.username,
                    email: res.user.email,
                    token: res.token,
                };
            },
        })
    ],
    callbacks: {
        session: ({ session, token }) => {
            console.log(session, token, "session and token");
            return {
                ...session,
                user: {
                    ...session.user,
                    // id: session!.user!.id,
                },
                token: token.token,
            };
        },
        jwt: ({ token, user }) => {
            if (user) {
                console.log(user, token, "user and token")
                const u = user as unknown as IAuth;
                return {
                    ...token,
                    id: u.id,
                    token: token.token,
                };
            }
            return token;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// export default handler;