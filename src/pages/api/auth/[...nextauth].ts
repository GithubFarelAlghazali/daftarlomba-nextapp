import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signUp } from "@/lib/firebase/service";

const authOptions: NextAuthOptions = {
     session: {
          strategy: "jwt",
     },
     secret: process.env.NEXTAUTH_SECRET,
     providers: [
          CredentialsProvider({
               type: "credentials",
               name: "Credentials",
               credentials: {
                    username: { label: "Nama", type: "text" },
                    email: { label: "Email", type: "email" },
                    password: { label: "Password", type: "password" },
                    bidang: { label: "Bidang lomba", type: "text" },
               },
               async authorize(credentials, req) {
                    const { email, password } = credentials as {
                         email: string;
                         password: string;
                    };
                    const user: any = await signUp({});
               },
          }),
     ],
     callbacks: {},
     pages: {},
};
