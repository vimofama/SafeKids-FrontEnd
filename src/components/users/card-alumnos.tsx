import { component$ } from "@builder.io/qwik";

import Usuario from "./icons/usuario.svg";

export interface CardAlumnosProps {
  nombre: string;
  ci: string;
  photo?: string;
}

export default component$(({ nombre, ci, photo }: CardAlumnosProps) => {
  return (
    <div class="inline-flex items-center justify-between self-stretch p-2">
      <div class="relative h-20 w-20">
        {
          photo ? (
            <img src={photo} width={80} height={80} alt="avatar" loading="lazy" />
          ) : (
            <img src={Usuario} width={80} height={80} alt="avatar" loading="lazy" />
          )
        }
      </div>
      <div class="inline-flex flex-col items-start justify-start gap-[11px]">
        <p class="text-sm font-normal text-black">{nombre}</p>
        <p class="self-stretch text-sm font-normal text-black">{ci}</p>
      </div>
    </div>
  );
});
