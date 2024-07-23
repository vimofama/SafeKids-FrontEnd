import { component$ } from "@builder.io/qwik";
import Navbar from "~/components/admin/navbar";
import RegistroTutor from "~/components/admin/tutor/registro-tutor";

export default component$(() => {
  return (
    <>
      <Navbar />
      <RegistroTutor />
    </>
  );
});
