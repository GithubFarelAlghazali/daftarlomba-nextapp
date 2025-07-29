import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";

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
                    const user: any = await signIn({
                         email,
                    });

                    if (user) {
                         // cek apakah password valid
                         const confirmPassword = await compare(password, user.password);
                         if (confirmPassword) {
                              return user;
                         } else {
                              return null;
                         }
                    }
               },
          }),
     ],
     callbacks: {
          jwt({ token, account, user }: any) {
               if (account?.provider === "credentials") {
                    token.email = user.email;
                    token.nama = user.nama;
                    token.bidang = user.bidang;
                    token.role = user.role;
               }
               return token;
          },
          async session({ session, token }: any) {
               if ("email" in token) {
                    session.user.email = token.email;
               }
               if ("nama" in token) {
                    session.user.nama = token.nama;
               }
               if ("bidang" in token) {
                    session.user.bidang = token.bidang;
               }
               if ("role" in token) {
                    session.user.role = token.role;
               }
               return session;
          },
     },
     pages: {
          signIn: "/login",
     },
};

export default NextAuth(authOptions);
