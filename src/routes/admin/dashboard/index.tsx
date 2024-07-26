import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import Hero from "~/components/admin/hero";
import Navbar from "~/components/admin/navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
});

export const head: DocumentHead = {
  title: "Dashboard",
};
