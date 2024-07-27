import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import ListaAlumno from "~/components/admin/alumno/lista-alumno";
import Navbar from "~/components/admin/navbar";
import type { StudenResponse } from "~/interfaces/admin/student.response";

export const useStudentsData = routeLoader$(async ({ cookie, env }) => {
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

    const dataCSRF = responseCSRF.data;

    const response = await axios.get(`${env.get("API_URL")}/students`, {
      maxBodyLength: Infinity,
      headers: {
        "csrf-token": dataCSRF.csrfToken,
        Authorization: `Bearer ${cookie.get("jwt")?.value}`,
        Cookie: `_csrf=${csrfCookie}`,
      },
      withCredentials: true,
    });

    const data: StudenResponse[] = response.data;

    return data as StudenResponse[];
  } catch (error: any) {
    console.log(`Error: ${error}`);
    return [];
  }
});

export default component$(() => {
  return (
    <>
      <Navbar />
      <ListaAlumno />
    </>
  );
});

export const head: DocumentHead = {
  title: "Lista de alumnos",
};
