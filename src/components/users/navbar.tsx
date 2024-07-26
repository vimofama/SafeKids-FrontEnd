import { component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

import iconoSalir from "./icons/salir.svg";

export default component$(() => {
  const nav = useNavigate();

  const logout = $(() => {
    nav("/login");
  });

  return (
    <div class="inline-flex h-12 w-[360px] items-center justify-between bg-blue-700 px-7 py-2">
      <div class="text-right text-xl font-semibold text-white">
        Bienvenido
      </div>
      <button onClick$={logout}>
        <img src={iconoSalir} alt="icono de salir" width="32" height="32" />
      </button>
    </div>
  );
});
