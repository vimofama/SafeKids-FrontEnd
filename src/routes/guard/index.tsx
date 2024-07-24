import { component$ } from "@builder.io/qwik";
import Hero from "~/components/guard/hero";
import Navbar from "~/components/guard/navbar";

export default component$(() => {
  return (
    <main>
        <Navbar />
        <Hero />
    </main>
  );
});