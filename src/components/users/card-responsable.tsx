import { component$ } from "@builder.io/qwik";

import Usuario from "./icons/usuario.svg";
import Pencil from "./icons/pencil.svg";
import Trash from "./icons/trash.svg";

export interface CardResponsableProps {
  nombre: string,
  celular: string,
  ci: string,
  photo?: string
}

export default component$(({nombre, celular, ci, photo}:CardResponsableProps) => {
  return (
    <div class="inline-flex items-center justify-between self-stretch p-2">
      <div class="relative h-14 w-14">
        {
          photo ? (
            <img src={photo} width={56} height={56} alt="avatar" loading="lazy" />
          ) : (
            <img src={Usuario} width={56} height={56} alt="avatar" loading="lazy" />
          )
        }
      </div>
      <div class="inline-flex flex-col items-start justify-start gap-[11px] mx-4">
        <p class="text-sm font-normal text-black">{nombre}</p>
        <p class="self-stretch text-sm font-normal text-black">{celular}</p>
        <p class="self-stretch text-sm font-normal text-black">{ci}</p>
      </div>
      <button class="relative h-6 w-6 mr-2">
        <img src={Pencil} width={24} height={24} alt="lapiz" />
      </button>
      <button class="relative h-8 w-8">
        <img src={Trash} width={24} height={24} alt="basurero" />
      </button>
    </div>
  );
});