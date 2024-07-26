import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ redirect, url }) => {
  if (url.pathname === "/") {
    throw redirect(302, "/login");
  }
};

export default component$(() => {
  return <Slot />;
});
