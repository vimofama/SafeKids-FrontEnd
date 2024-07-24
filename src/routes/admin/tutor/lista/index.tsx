import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import Navbar from "~/components/admin/navbar";
import ListaTutor from "~/components/admin/tutor/lista-tutor";
import { type UsersResponse } from "~/interfaces";

export const useUsersData = routeLoader$(async ({ cookie, env }) => {
  try {
    const response = await axios.get(`${env.get("API_URL")}/users/`, {
      maxBodyLength: Infinity,
      headers: {
        Authorization: `Bearer ${cookie.get("jwt")?.value}`,
      },
    });

    const data: UsersResponse[] = response.data;

    return data as UsersResponse[];
  } catch (error) {
    console.log(`Error: ${error}`);
    return [];
  }
});

export default component$(() => {
  return (
    <>
      <Navbar />
      <ListaTutor />
    </>
  );
});
