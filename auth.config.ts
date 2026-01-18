//auth.config.ts
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DefaultSession } from "next-auth";
//import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    idUsuario: string;
    id: string;
    email: string;
    name: string;
    apellido: string;
    userType: string;
    foto_perfil: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Control de acceso basado en la autenticación y ruta
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Verifica si el usuario está autenticado
      console.log(isLoggedIn ? "Usuario autenticado" : "Usuario no autenticado");
      const isOnVolunteer = nextUrl.pathname.startsWith("/volunteer");
      const isOnOrganization = nextUrl.pathname.startsWith("/organization");
      /*
      if (isOnVolunteer || isOnOrganization) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl)); // redigire a login si no está autenticado
      }
      */
      
      // Restricción de acceso para rutas de voluntario
      if(isOnVolunteer){
        console.log( auth?.user);
        if(isLoggedIn && auth?.user.userType === "VOL") return true; 
        console.log("Redirecting to login");
        return Response.redirect(new URL("/login", nextUrl)); // redigire a login si no está autenticado
      }
      // Restricción de acceso para rutas de organización
      if(isOnOrganization){
        if(isLoggedIn && auth?.user.userType === "ORG") return true;
        return Response.redirect(new URL("/login", nextUrl)); // redigire a login si no está autenticado
      }
      return true; // Permitir acceso a otras rutas
    },
    
    // Añadir información adicional al token JWT
    jwt({ token, user, trigger, session }) { //
      if (user) {
        token.idUsuario = user.idUsuario;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.apellido = user.apellido;
        token.userType = user.userType;
        token.foto_perfil = user.foto_perfil;
      }
      // Actualizar el token cuando la sesión se actualiza
      if (trigger === "update" && session) {
        token.name = session.user.name;
        token.foto_perfil = session.user.foto_perfil;
      }
      console.log("JWT token:", token);
      return token;
    },
    // Añadir información adicional a la sesión
    session({ session, token }) {
      if (session.user) {
        session.user.idUsuario = token.idUsuario as string;
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.apellido = token.apellido as string;
        session.user.userType = token.userType as string;
        session.user.foto_perfil = token.foto_perfil as string;

      }
      return session;
    },
  },
  // Definición del proveedor de autenticación
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // Campos del formulario de inicio de sesión
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Función para autorizar al usuario
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email y contraseña requeridos");
          }


          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Email o contraseña incorrectos");
          }

          const user = await response.json(); // Asegúrate de que la API devuelva el usuario en el formato correcto
          console.log("Auth user:", user);

          // Retorna el usuario para almacenarlo en la sesión
          return {
            idUsuario: user.id_user,
            id: user.id_org || user.id_vol,
            email: user.email,
            name: user.pnombre || user.nombre,
            apellido: user.spellido || null,
            userType: user.rol,
            foto_perfil: user.foto_perfil || user.logo || null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null; // Retorna null si la autenticación falla
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

/*
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [
    // Add your authentication providers here
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        // Aquí validas contra tu base de datos
        // Retorna el usuario si es válido, null si no
        return user || null;
      },
    }),
  ],
  //secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
*/
