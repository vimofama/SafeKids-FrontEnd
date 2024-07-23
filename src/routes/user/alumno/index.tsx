import { component$ } from "@builder.io/qwik";
import CardAlumnos from "~/components/users/card-alumnos";
import Navbar from "~/components/users/navbar";

export default component$(() => {
  return (
    <main class="flex flex-col items-center justify-center">
      <Navbar />
      <div class="inline-flex h-[592px] w-[360px] flex-col items-center justify-center gap-5 px-2">
        <h1 class="self-stretch text-center text-xl font-semibold text-black">
          Tutor Responsable
        </h1>
        <div class="flex h-[286px] flex-col items-center justify-center gap-2 self-stretch py-1">
          <h2 class="self-stretch text-center text-xl font-semibold capitalize text-black">
            Alumnos Registrados
          </h2>
          <div class="overflow-y-scroll">
            <CardAlumnos nombre="Nombre Apellido" ci="1999999999" />
            <CardAlumnos nombre="Nombre Apellido" ci="1999999999" />
          </div>
          <a
            href="/user"
            class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1"
          >
            <div class="text-xl font-semibold capitalize text-white">
              Regresar
            </div>
          </a>
        </div>
      </div>
    </main>
  );
});