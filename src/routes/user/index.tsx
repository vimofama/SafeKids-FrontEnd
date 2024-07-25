import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import Hero from "~/components/users/hero";
import Navbar from "~/components/users/navbar";
import { type UsersResponse } from "~/interfaces";

export const useUserData = routeLoader$(async ({ cookie, env }) => {
  try {
    const id = cookie.get("userId")?.value;

    const response = await axios.get(`${env.get("API_URL")}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${cookie.get("jwt")?.value}`,
        Cookie: "_csrf=np4w55lmX81EnE44c53U_g",
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
  // const signal = useUserData();
  return (
    <main class="flex flex-col items-center justify-center">
      <Navbar />
      <Hero />
    </main>
  );
});
