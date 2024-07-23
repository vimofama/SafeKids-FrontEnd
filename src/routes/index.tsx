import { component$ } from "@builder.io/qwik";
import { routeAction$ } from "@builder.io/qwik-city";

export const useRedirect = routeAction$((_, { redirect }) => {
  redirect(302, "/login");
});

export default component$(() => {
  const action = useRedirect();
  return <div onClick$={() => {action}} ></div>;
});
