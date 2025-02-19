import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import axios from "axios";
import Navbar from "~/components/admin/navbar";
import RegistroTutor from "~/components/admin/tutor/registro-tutor";

export const useTutorForm = routeAction$(
  async (data, { cookie, env }) => {
    const { nombres, apellidos, ci, celular, email, password, password2 } =
      data;

    try {
      // Validar contraseñas
      if (password !== password2) {
        return {
          success: false,
          message: "Las contraseñas no coinciden",
        };
      }

      const responseCSRF = await axios.get(
        `${env.get("API_URL")}/users/token-csrf`,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")?.value}`,
          },
          withCredentials: true,
        },
      );

      const cookieCSRF = responseCSRF.headers["set-cookie"]?.find(
        (cookie: string) => cookie.includes("_csrf"),
      );

      if (!cookieCSRF) {
        throw new Error("No se pudo obtener la cookie CSRF");
      }

      const csrfCookieMatch = cookieCSRF.match(/_csrf=([^;]+)/);
      const csrfCookie = csrfCookieMatch ? csrfCookieMatch[1] : "";

      // Crear usuario
      await axios.post(
        `${env.get("API_URL")}/users/register`,
        {
          fullName: `${nombres} ${apellidos}`,
          ci,
          phone: celular,
          email,
          password,
          userRole: "Tutor",
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")?.value}`,
            Cookie: `_csrf=${csrfCookie}`,
            'csrf-token': responseCSRF.data.csrfToken,
          },
          withCredentials: true,
        },
      );

      return {
        success: true,
        message: "Usuario creado exitosamente",
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: "Error al registrar el tutor, intente nuevamente o contacte al administrador del sistema",
        };
      }
    }
  },
  zod$({
    nombres: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    apellidos: z
      .string()
      .min(3, "El apellido debe tener al menos 3 caracteres"),
    ci: z.string().length(10, "La cédula debe tener 10 dígitos"),
    celular: z.string().length(10, "El celular debe tener 10 dígitos"),
    email: z.string().email("Formato no valido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*\d)(?=.*\W)(?=.*[A-Z])(?=.*[a-z])[^\n]*$/,
        "La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un caracter especial",
      ),
    password2: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*\d)(?=.*\W)(?=.*[A-Z])(?=.*[a-z])[^\n]*$/,
        "La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un caracter especial",
      ),
  }),
);

export default component$(() => {
  return (
    <>
      <Navbar />
      <RegistroTutor />
    </>
  );
});

export const head: DocumentHead = {
  title: "Registro de tutor",
};