import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeAction$, routeLoader$, z, zod$ } from "@builder.io/qwik-city";
import axios from "axios";
import UpdateAlumno from "~/components/admin/alumno/update-alumno";
import Navbar from "~/components/admin/navbar";
import type { StudenResponse } from "~/interfaces";

export const useAlumnoUpdate = routeAction$(
  async (data, { cookie, env, params }) => {
    const id = params.id;
    const { fullName, ci, ci_tutor } = data;
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

      // Actualizar alumno
      await axios.patch(
        `${env.get("API_URL")}/students/${id}`,
        {
          fullName,
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
          message: "Error al actualizar el alumno, intente de nuevo o contacte al administrador",
        };
      }
    }
  },
  zod$({
    fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    ci: z.string().length(10, "La cédula debe tener 10 dígitos"),
    ci_tutor: z.string().length(10, "La cédula debe tener 10 dígitos"),
  }),
);

export const useAlumnoId = routeLoader$(
  async ({ params, cookie, env, redirect }) => {
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
      redirect(307, "/admin/alumno/lista");
    }
  },
);

export default component$(() => {
  const route = useAlumnoId();
  const student = route.value!;

  return (
    <>
      <Navbar />
      <UpdateAlumno
        fullName={student.fullName}
        ci={student.ci}
        ci_tutor={student.guardian.ci}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Actualizar alumno",
};