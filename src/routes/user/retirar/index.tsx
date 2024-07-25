import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import Navbar from "~/components/users/navbar";
import Retiro from "~/components/users/retiro";
import type { AuthorizedPerson, UsersResponse } from "~/interfaces";

export const useUserData = routeLoader$(async ({ cookie, env }) => {
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

    // const dataCSRF = responseCSRF.data;

    const id = cookie.get("userId")?.value;

    const response = await axios.get(`${env.get("API_URL")}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.get("jwt")?.value}`,
        Cookie: responseCSRF.config.headers.Cookie,
      },
      withCredentials: true,
    });
    const user: UsersResponse = response.data;
    return user as UsersResponse;
  } catch (error) {
    console.log(`Error: ${error}`);
    return error;
  }
});

export default component$(() => {
  const signal = useUserData().value as UsersResponse;
  const alumnos = signal.students!;
  const responsables: AuthorizedPerson[] = [];

  alumnos?.forEach((alumno) => {
    alumno.authorizedPersons.forEach((responsable) => {
      responsables.push(responsable);
    });
  });

  return (
    <main class="flex flex-col items-center justify-center">
      <Navbar />
      <Retiro alumnos={alumnos} responsables={responsables} />
    </main>
  );
});