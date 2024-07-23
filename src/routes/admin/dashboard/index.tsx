import { component$ } from "@builder.io/qwik";
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
