// import GitHub from '@auth/core/providers/github';
import { defineConfig } from 'auth-astro';
import Credentials from '@auth/core/providers/credentials';
import { db, eq, User } from 'astro:db';
import bcrypt from 'bcryptjs';

export default defineConfig({
  providers: [
    //TODO:
    // GitHub({
    //   clientId: import.meta.env.GITHUB_CLIENT_ID,S
    //   clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    // }),

    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async ({ email, password }) => {

        const [user] = await db.select().from(User).where(eq(User.email, `${email}`));

        if (!user) {
          throw new Error('No se encontro el usuario');
        }

        if (!bcrypt.compareSync(password as string, user.password)) {
          throw new Error('Contraseña inválida');
        }

        const { password: _, ...userWithoutPassword } = user;

        return userWithoutPassword;
      }
    })
  ],
});