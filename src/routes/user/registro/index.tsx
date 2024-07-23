import { component$ } from "@builder.io/qwik";
import Navbar from "~/components/users/navbar";
import RegistroResponsable from "~/components/users/registro-responsable";

export default component$(() => {
  return (
    <main class="flex flex-col items-center justify-center">
      <Navbar />
      <RegistroResponsable />
    </main>
  );
});