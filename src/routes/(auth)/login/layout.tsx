import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({cookie}) => {
    cookie.delete("jwt");
};

export default component$(() => {
  return <Slot />;
});