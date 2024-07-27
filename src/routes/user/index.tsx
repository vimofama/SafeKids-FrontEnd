import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import Hero from "~/components/users/hero";
import Navbar from "~/components/users/navbar";
import type { AuthorizedPersons } from "~/interfaces";

export const useAuthorizedData = routeLoader$(async ({ cookie, env }) => {
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

    const id = cookie.get("userId")?.value;

    const response = await axios.get(
      `${env.get("API_URL")}/authorized-persons/guardian/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookie.get("jwt")?.value}`,
          Cookie: `_csrf=${csrfCookie}`,
          "csrf-token": responseCSRF.data.csrfToken,
        },
        withCredentials: true,
      },
    );
    const user = response.data;
    return user as AuthorizedPersons[];
  } catch (error) {
    console.log(`Error: ${error}`);
    return [];
  }
});

export default component$(() => {
  return (
    <main class="flex flex-col items-center justify-center">
      <Navbar />
      <Hero />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Tutor",
};