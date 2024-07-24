import { component$ } from "@builder.io/qwik";

import Usuario from "./icons/usuario.svg";

export interface CardAlumnosProps {
  nombre: string;
  ci: string;
}

export default component$(({ nombre, ci }: CardAlumnosProps) => {
  return (
    <div class="inline-flex items-center justify-between self-stretch p-2">
      <div class="relative h-20 w-20">
        <img src={Usuario} width={80} height={80} alt="avatar" />
      </div>
      <div class="inline-flex flex-col items-start justify-start gap-[11px]">
        <p class="text-sm font-normal text-black">{nombre}</p>
        <p class="self-stretch text-sm font-normal text-black">{ci}</p>
      </div>
    </div>
  );
});
