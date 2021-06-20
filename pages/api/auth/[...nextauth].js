import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        let user;

        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/profile/signin/`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          }
        );
        const result = await response.json();
        user = result;

        if (user) {
          return user;
        } else {
          return null;
        }

        // const res =
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    jwt: true,
    maxAge: 1 * 24 * 60 * 60, // 30 * 24 * 60 * 60
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async signIn(user) {
      return user.userId && user.isActive === '1';
    },

    async session(session, token) {
      session.user = token.user;
      return session;
    },
    async jwt(token, user) {
      if (user) token.user = user;
      return token;
    },
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },

  database: `${process.env.MONGODB_URI}`,
};

export default (req, res) => NextAuth(req, res, options);
