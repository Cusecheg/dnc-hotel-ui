import { DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number | string;
            role: "USER" | "ADMIN";
            avatar: string;
            access_token: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: number | string;
        role: "USER" | "ADMIN";
        avatar: string;
        access_token: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: number | string;
        role: "USER" | "ADMIN";
        access_token: string;
    }
}