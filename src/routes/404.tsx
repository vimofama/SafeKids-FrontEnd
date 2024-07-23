import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import Logo from "~/media/logo-safekids.jpg?jsx";

export default component$(() => {
  return (
    <main class="flex h-screen flex-col items-center justify-center text-center">
      <div class="flex flex-col items-center">
        <Logo alt="Logo de la aplicación" class="mb-6 h-64 w-64" style={{width:256, height:256}}/>
        <h1 class="mb-4 text-5xl font-bold text-black">404</h1>
        <p class="mb-8 text-xl text-gray-700">Página no encontrada</p>
        <Link href="/login" class="text-blue-500 underline">
          Haz clic aquí para regresar al login
        </Link>
      </div>
    </main>
  );
});