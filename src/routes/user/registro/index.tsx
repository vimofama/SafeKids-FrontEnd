import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import axios from "axios";
import Navbar from "~/components/users/navbar";
import RegistroResponsable from "~/components/users/registro-responsable";

export const useCreateAuthorizedPerson = routeAction$(
  async (data, { cookie, env }) => {
    const { nombres, ci, celular } = data;
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

      if (!cookieCSRF) {
        throw new Error("No se pudo obtener la cookie CSRF");
      }

      const csrfCookieMatch = cookieCSRF.match(/_csrf=([^;]+)/);
      const csrfCookie = csrfCookieMatch ? csrfCookieMatch[1] : "";

      const id = cookie.get("userId")?.value;

      await axios.post(
        `${env.get("API_URL")}/authorized-persons`,
        {
          fullName: nombres,
          ci,
          phone: celular,
          guardianId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")?.value}`,
            "csrf-token": responseCSRF.data.csrfToken,
            Cookie: `_csrf=${csrfCookie}`,
          },
          withCredentials: true,
        },
      );

      return {
        success: true,
        message: "Persona autorizada creada exitosamente",
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: "Error al crear la persona autorizada",
        };
      }
    }
  },
  zod$({
    nombres: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    ci: z.string().length(10, "La cédula debe tener 10 dígitos"),
    celular: z.string().length(10, "El celular debe tener 10 dígitos"),
  }),
);

export default component$(() => {
  return (
    <main class="flex flex-col items-center justify-center">
      <Navbar />
      <RegistroResponsable />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Registro de persona autorizada",
};