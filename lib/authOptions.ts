import { getServerSession, type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import generateJWT from "./generateJWT";
import compareValues from "./compareBcrypt";
import prismadb from "./db";

export const authOptions: NextAuthOptions = {
  pages:{
    signIn:"/login",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENTID as string,
      clientSecret: process.env.GITHUB_CLIENTSECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID as string,
      clientSecret: process.env.GOOGLE_CLIENTSECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Username/Email",
          type: "text",
          placeholder: "username or email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your password",
        },
      },
      async authorize(credentials, req) {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if (emailRegex.test(String(credentials?.identifier))) {
          const userAttempt = await prismadb.user.findUnique({
            where:{
                email:credentials?.identifier
            }
          })

          if (!userAttempt)
            throw new Error(
              `Cannot find any users with the email of ${credentials?.identifier}`
            );

            const passwordMatch = await compareValues(String(credentials?.password),userAttempt.password!);
            
          if (passwordMatch) {
            
            return userAttempt;
          }
          throw new Error(`Password doesn't match !`);
        } else {
          const userAttempt = await prismadb.user.findUnique({where:{
            username:credentials?.identifier
          }});
          if (!userAttempt)
            throw new Error(
              `Cannot find any users with username ${credentials?.identifier}`
            );
          const passwordMatch = await compareValues(
            String(credentials?.password),
            userAttempt.password!
          );

          if (passwordMatch) {
            return userAttempt;
          }
          throw new Error(`Password doesn't match !`);

        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      
      const existingUser = await prismadb.user.findUnique({where:{email: token.email || "" }});
      if(existingUser){
        token.name=existingUser?.username;
        token.picture=existingUser?.imageUrl;
      }else{
        const newUser = await prismadb.user.create({
            data:{
                username: token.name!,
                email: token.email!,
                imageUrl: token.picture!,
            }
        });
        token.name=newUser?.username;
        token.picture=newUser?.imageUrl;
      }
      const userJwt = generateJWT({
        username: token.name!,
        email: token.email!,
        imageUrl: token.picture!,
      });
    
      token.access_token = userJwt;

      return token;
    },
    
    async session({ session, token }) {
      if (session && session.user && token) {
        session.user.token = String(token.access_token);
      }
      const currentUser = await prismadb.user.findUnique({
        where:{
            username: session.user?.name!,
            email: session.user?.email!,
        }
      });

      if (session.user && currentUser) {
        session.user.id = String(currentUser.id);
      }
      
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);