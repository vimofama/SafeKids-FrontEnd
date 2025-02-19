import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import CardAlumnos from "~/components/users/card-alumnos";
import Navbar from "~/components/users/navbar";
import type { UsersResponse } from "~/interfaces";

export const useUserData = routeLoader$(async ({ cookie, env, redirect }) => {
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

    const response = await axios.get(`${env.get("API_URL")}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.get("jwt")?.value}`,
        Cookie: `_csrf=${csrfCookie}`,
      },
      withCredentials: true,
    });
    const user: UsersResponse = response.data;
    return user as UsersResponse;
  } catch (error) {
    redirect(302, "/login");
  }
});

export default component$(() => {
  const signal = useUserData().value as UsersResponse;
  return (
    <main class="flex flex-col items-center justify-center">
      <Navbar />
      <div class="inline-flex h-[592px] w-[360px] flex-col items-center justify-center gap-5 px-2">
        <h1 class="self-stretch text-center text-xl font-semibold text-black">
          Tutor Responsable
        </h1>
        <div class="flex h-[286px] flex-col items-center justify-center gap-2 self-stretch py-1">
          <h2 class="self-stretch text-center text-xl font-semibold capitalize text-black">
            Alumnos Registrados
          </h2>
          <div class="overflow-y-scroll">
            {signal.students?.map(({ id, fullName, ci, imageURL }) => (
              <CardAlumnos
                key={id}
                nombre={fullName}
                ci={ci}
                photo={imageURL}
              />
            ))}
          </div>
          <a
            href="/user"
            class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1"
          >
            <div class="text-xl font-semibold capitalize text-white">
              Regresar
            </div>
          </a>
        </div>
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Alumnos",
};