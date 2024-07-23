import { component$ } from "@builder.io/qwik";
import RegisterGuardia from "~/components/admin/guard/register-guardia";
import Navbar from "~/components/admin/navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <RegisterGuardia />
    </>
  );
});
