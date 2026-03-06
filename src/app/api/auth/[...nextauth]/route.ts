import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

 export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "E-mail", type: "email" },
                password: { label: "Senha", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error('No credentials provided');
                }

                try {
                    const { data: { access_token } } = await axios.post(`${API_BASE_URL}/auth/login`, {
                        email: credentials.email,
                        password: credentials.password,
                    });


                    const { sub: id, role } = JSON.parse(Buffer.from(access_token.split('.')[1], 'base64').toString());
                    (await cookies()).set("access_token", access_token);
                    
                    let user: any;

                    if (role === 'ADMIN') {
                        // ADMIN: Fetch user data for any user
                        const { data } = await axios.get(`${API_BASE_URL}/users/${id}`, {
                            headers: {
                                Authorization: `Bearer ${access_token}`
                            }
                        });
                        user = data;
                    } else if (role === 'USER') {
                        // USER: Fetch only their own data
                        const { data } = await axios.get(`${API_BASE_URL}/users/me`, {
                            headers: {
                                Authorization: `Bearer ${access_token}`
                            }
                        });
                        user = data;
                    }

                    return {
                        ...user,
                        access_token,
                        // image: user.avatar, // Assuming the API returns an 'avatar' field for the user's profile picture
                    };
                } catch (error: any) {
                    console.error('Error during authorization:', error);
                    throw new Error('Invalid credentials');
                }
            },
        })
    ],
    callbacks: {
         async jwt({ token, user }) {

            if (user){
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.avatar = user.avatar;
                token.access_token = user.access_token;
            }
            return token;
    },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as number;
                session.user.role = token.role as "USER" | "ADMIN";
                session.user.access_token = token.access_token as string;
                session.user.avatar = token.avatar as string;
            }
            return session;
    },
    },
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };