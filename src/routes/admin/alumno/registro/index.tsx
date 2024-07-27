import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import axios from "axios";
import RegisterAlumno from "~/components/admin/alumno/register-alumno";
import Navbar from "~/components/admin/navbar";

export const useAlumnoForm = routeAction$(
  async (data, { cookie, env }) => {
    const { nombres, apellidos, ci, ci_tutor } = data;
    try {
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

      const csrfCookieMatch = cookieCSRF!!.match(/_csrf=([^;]+)/);
      const csrfCookie = csrfCookieMatch ? csrfCookieMatch[1] : "";

      const responseUser = await axios.get(
        `${env.get("API_URL")}/users/${ci_tutor}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")?.value}`,
            Cookie: `_csrf=${csrfCookie}`,
          },
          withCredentials: true,
        },
      );

      const user = responseUser.data;

      // Crear alumno
      await axios.post(
        `${env.get("API_URL")}/students`,
        {
          fullName: `${nombres} ${apellidos}`,
          ci,
          guardianId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")?.value}`,
            Cookie: `_csrf=${csrfCookie}`,
            "csrf-token": responseCSRF.data.csrfToken,
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
          message: error.message,
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
    ci_tutor: z.string().length(10, "La cédula debe tener 10 dígitos"),
  }),
);

export default component$(() => {
  return (
    <>
      <Navbar />
      <RegisterAlumno />
    </>
  );
});

export const head: DocumentHead = {
  title: "Registro de alumno",
};
