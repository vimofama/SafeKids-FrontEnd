import { component$ } from "@builder.io/qwik";
import { routeAction$, z, zod$ } from "@builder.io/qwik-city";
import axios from "axios";
import Navbar from "~/components/users/navbar";
import RegistroResponsable from "~/components/users/registro-responsable";
import { UsersResponse } from "~/interfaces";

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

      const dataCSRF = responseCSRF.data;

      const id = cookie.get("userId")?.value;

      const response = await axios.get(`${env.get("API_URL")}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.get("jwt")?.value}`,
          Cookie: responseCSRF.config.headers.Cookie,
        },
        withCredentials: true,
      });
      const user: UsersResponse = response.data;

      user.students?.forEach(async (student) => {
        await axios.post(
          `${env.get("API_URL")}/authorized-persons`,
          {
            fullName: nombres,
            ci,
            phone: celular,
            studentId: student.id,
          },
          {
            headers: {
              Authorization: `Bearer ${cookie.get("jwt")?.value}`,
              "csrf-token": dataCSRF.csrfToken,
              Cookie: responseCSRF.config.headers.Cookie,
            },
            withCredentials: true,
          },
        );
      });

      return {
        success: true,
        message: "Persona autorizada creada exitosamente",
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
