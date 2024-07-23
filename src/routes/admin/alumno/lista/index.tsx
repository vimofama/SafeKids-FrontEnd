import { component$ } from "@builder.io/qwik";
import ListaAlumno from "~/components/admin/alumno/lista-alumno";
import Navbar from "~/components/admin/navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <ListaAlumno />
    </>
  );
});
