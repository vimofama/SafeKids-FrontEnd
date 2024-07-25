import { component$ } from "@builder.io/qwik";
// import { routeAction$ } from "@builder.io/qwik-city";
import RegisterAlumno from "~/components/admin/alumno/register-alumno";
import Navbar from "~/components/admin/navbar";

// export const useAlumnoForm = routeAction$(
//   async (data, {cookie, env}) => {
//     const { nombres, apellidos, ci, ci_tutor } = data;
//     //TODO: Implementar lógica de registro de alumno
//   }
// );

export default component$(() => {
  return (
    <>
      <Navbar />
      <RegisterAlumno />
    </>
  );
});
