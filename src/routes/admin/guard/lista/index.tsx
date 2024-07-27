import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import axios from "axios";
import ListaGuardia from "~/components/admin/guard/lista-guardia";
import Navbar from "~/components/admin/navbar";
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
    return [];
  }
});

export default component$(() => {
  return (
    <>
      <Navbar />
      <ListaGuardia />
    </>
  );
});

export const head: DocumentHead = {
  title: "Lista de guardias",
};
