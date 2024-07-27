import { component$ } from "@builder.io/qwik";
import {
  type DocumentHead,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import axios from "axios";
import Navbar from "~/components/guard/navbar";
import RegisterPickup from "~/components/guard/register-pickup";
import type { StudenResponse } from "~/interfaces";

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

      if (!cookieCSRF) {
        throw new Error("No se pudo obtener la cookie CSRF");
      }

      const csrfCookieMatch = cookieCSRF.match(/_csrf=([^;]+)/);
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
        return {
          success: false,
          message: "Error al registrar la salida, intente de nuevo o contacte al administrador",
        };
      }
    }
  },
  zod$({
    ci_student: z.string().length(10, "La cédula debe tener 10 dígitos"),
    ci_tutor: z.string().length(10, "La cédula debe tener 10 dígitos"),
  }),
);

export const usePickupId = routeLoader$(async ({ params, cookie, env, redirect }) => {
  const id = params.id;

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

    const responseStudent = await axios.get(
      `${env.get("API_URL")}/students/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookie.get("jwt")?.value}`,
          Cookie: `_csrf=${csrfCookie}`,
          "csrf-token": responseCSRF.data.csrfToken,
        },
        withCredentials: true,
      },
    );

    const student: StudenResponse = responseStudent.data;
    return student as StudenResponse;
  } catch (error) {
    redirect(307, "/guard");
  }
});

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
