import { component$ } from "@builder.io/qwik";
import RegisterAlumno from "~/components/admin/alumno/register-alumno";
import Navbar from "~/components/admin/navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <RegisterAlumno />
    </>
  );
});
