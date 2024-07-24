import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import ListaAlumno from "~/components/admin/alumno/lista-alumno";
import Navbar from "~/components/admin/navbar";
import { Student } from "~/interfaces";

export const useStudentsData = routeLoader$(async ({ cookie, env }) => {
  try {
    const responseCSRF = await axios.get(
      `${env.get("API_URL")}/users/token-csrf`,
      {
        headers: {
          Authorization: `Bearer ${cookie.get("jwt")?.value}`,
        },
      },
    );

    const dataCSRF = responseCSRF.data;

    console.log(`CSRF Token: ${dataCSRF.csrfToken}`);

    const response = await axios.get(`${env.get('API_URL')}/students`, {
      maxBodyLength: Infinity,
      headers: {
        "csrf-token": dataCSRF.csrfToken,
        Authorization: `Bearer ${cookie.get("jwt")?.value}`,
      },
    });

    const data: Student[] = response.data;

    return data as Student[];
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
