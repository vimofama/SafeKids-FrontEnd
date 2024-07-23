import { component$ } from "@builder.io/qwik";
import Hero from "~/components/users/hero";
import Navbar from "~/components/users/navbar";

export default component$(() => {
  return (
    <main class="flex flex-col items-center justify-center">
        <Navbar />
        <Hero />
    </main>
  );
});