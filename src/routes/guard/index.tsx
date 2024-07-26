import { component$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import Hero from "~/components/guard/hero";
import Navbar from "~/components/guard/navbar";
import type { PickUpResponse } from "~/interfaces";

export const usePickupData = routeLoader$(async ({ cookie, env }) => {
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

    const response = await axios.get(`${env.get("API_URL")}/pick-ups`, {
      maxBodyLength: Infinity,
      headers: {
        "csrf-token": dataCSRF.csrfToken,
        Authorization: `Bearer ${cookie.get("jwt")?.value}`,
        Cookie: `_csrf=${csrfCookie}`,
      },
      withCredentials: true,
    });

    const data: PickUpResponse[] = response.data;
    
    return data as PickUpResponse[];
  } catch (error) {
    console.log(`Error: ${error}`);
    return [];
  }
});

export default component$(() => {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Guardias",
};
