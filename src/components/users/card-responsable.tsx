import { component$ } from "@builder.io/qwik";

import Usuario from "./icons/usuario.svg";
import Pencil from "./icons/pencil.svg";
import Trash from "./icons/trash.svg";

export interface CardResponsableProps {
  nombre: string,
  celular: string,
  ci: string,
}

export default component$(({nombre, celular, ci}:CardResponsableProps) => {
  return (
    <div class="inline-flex items-center justify-between self-stretch p-2">
      <div class="relative h-20 w-20">
        <img src={Usuario} width={80} height={80} alt="avatar" />
      </div>
      <div class="inline-flex flex-col items-start justify-start gap-[11px]">
        <p class="text-sm font-normal text-black">{nombre}</p>
        <p class="self-stretch text-sm font-normal text-black">{celular}</p>
        <p class="self-stretch text-sm font-normal text-black">{ci}</p>
      </div>
      <button class="relative h-8 w-8">
        <img src={Pencil} width={32} height={32} alt="lapiz" />
      </button>
      <button class="relative h-8 w-8">
        <img src={Trash} width={32} height={32} alt="basurero" />
      </button>
    </div>
  );
});