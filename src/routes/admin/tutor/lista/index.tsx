import { component$ } from "@builder.io/qwik";
import Navbar from "~/components/admin/navbar";
import ListaTutor from "~/components/admin/tutor/lista-tutor";

export default component$(() => {
  return (
    <>
      <Navbar />
      <ListaTutor />
    </>
  );
});
