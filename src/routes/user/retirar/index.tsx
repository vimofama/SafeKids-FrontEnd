import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import Navbar from "~/components/users/navbar";
import Retiro from "~/components/users/retiro";
import type { PickUpResponse } from "~/interfaces";

export const usePickUpsData = routeLoader$(async ({ cookie, env }) => {
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

    const response = await axios.get(`${env.get("API_URL")}/pick-ups`, {
      headers: {
        Authorization: `Bearer ${cookie.get("jwt")?.value}`,
        Cookie: `_csrf=${csrfCookie}`,
        "csrf-token": responseCSRF.data.csrfToken,
      },
      withCredentials: true,
    });
    const authorizedPersons: PickUpResponse[] = response.data;

    const listaRetiros = authorizedPersons.filter(
      (pick) => {
        if (pick.authorizedPerson) {
          return pick.student.guardian.id === id;
        }
      }
    );
    return listaRetiros;
  } catch (error) {
    return [];
  }
});

export default component$(() => {
  return (
    <main class="flex flex-col items-center justify-center">
      <Navbar />
      <Retiro />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Retiros",
};
