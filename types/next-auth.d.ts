import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    /** This is an example. You can find me in types/next-auth.d.ts */
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      discord: string;
      student: string;
    } & DefaultSession['user'];
  }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    bar: number;
    role: string;
  }
}