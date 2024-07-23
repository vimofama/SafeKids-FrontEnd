import { component$ } from "@builder.io/qwik";
import ListaGuardia from "~/components/admin/guard/lista-guardia";
import Navbar from "~/components/admin/navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <ListaGuardia />
    </>
  );
});
