import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "/src/app/utils/prismaDb";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log(credentials);
        const res = await prisma.user.findFirst({
          where: {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            // image: credentials.image,
          },
        });
        console.log(res, "this is user");
        return res;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      console.log(token);
      console.log(session);
      session.accessToken = token.accessToken;
      session.user.id = token.sub;
      console.log(session);
      return session;
    },
  },
  secret: "http://localhost:3000",
  pages: {
    signIn: "http://localhost:3000",
  },
});

export { handler as GET, handler as POST };
