import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import axios from "axios";
import Navbar from "~/components/guard/navbar";
import RegisterPickup from "~/components/guard/register-pickup";

export const usePickUpForm = routeAction$(
  async (data, { cookie, env }) => {
    const { ci_student, ci_tutor } = data;
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

      // Obtener datos del alumno

      const responseStudent = await axios.get(
        `${env.get("API_URL")}/students/${ci_student}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")?.value}`,
            Cookie: `_csrf=${csrfCookie}`,
            "csrf-token": responseCSRF.data.csrfToken,
          },
          withCredentials: true,
        },
      );

      const student = responseStudent.data;

      // Obtener datos de la persona autorizada

      const responseGuardian = await axios.get(
        `${env.get("API_URL")}/authorized-persons/${ci_tutor}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")?.value}`,
            Cookie: `_csrf=${csrfCookie}`,
            "csrf-token": responseCSRF.data.csrfToken,
          },
          withCredentials: true,
        },
      );

      const guardian = responseGuardian.data;

      // Crear registro de salida

      await axios.post(
        `${env.get("API_URL")}/pick-ups/`,
        {
          timestamp: new Date(),
          authorizedPersonId: guardian.id,
          studentId: student.id,
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
        message: "Salida registrada exitosamente",
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(`Error: ${JSON.stringify(error)}`);
        return {
          success: false,
          message: "Error al registrar la salida",
        };
      }
    }
  },
  zod$({
    ci_student: z.string().length(10, "La cédula debe tener 10 dígitos"),
    ci_tutor: z.string().length(10, "La cédula debe tener 10 dígitos"),
  }),
);

export default component$(() => {
  return (
    <>
      <Navbar />
      <RegisterPickup />
    </>
  );
});

export const head: DocumentHead = {
  title: "Registro de salida",
};
