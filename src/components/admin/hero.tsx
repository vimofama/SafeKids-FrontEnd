import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import ImageTutor from "../../media/tutores.png?jsx";
import ImageStudent from "../../media/alumnos.png?jsx";
import ImageGuard from "../../media/guardia.png?jsx";

import Plus from "./icons/plus.svg";

export default component$(() => {
  return (
    <main class="mt-10 inline-flex w-full items-center justify-between px-[180px]">
      <div class="inline-flex w-72 flex-col items-center justify-start gap-[11px]">
        <div>
          <div class="self-stretch text-center text-4xl font-normal text-black">
            Tutores
          </div>
          <ImageTutor
            style={{ width: 256, height: 256 }}
            alt="Imagen de tutores"
            loading="lazy"
          />
        </div>

        <Link
          href="/admin/tutor/lista/"
          class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2"
        >
          <div class="text-[28px] font-semibold capitalize text-white">
            Ver lista
          </div>
          <div class="relative h-8 w-8">
            <img src={Plus} width={32} height={32} />
          </div>
        </Link>

        <Link
          href="/admin/tutor/registro/"
          class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2"
        >
          <div class="text-[28px] font-semibold capitalize text-white">
            Agregar
          </div>
          <div class="relative h-8 w-8">
            <img src={Plus} width={32} height={32} />
          </div>
        </Link>
      </div>

      <div class="inline-flex w-72 flex-col items-center justify-start gap-[11px]">
        <div>
          <div class="self-stretch text-center text-4xl font-normal text-black">
            Alumnos
          </div>
          <ImageStudent
            style={{ width: 256, height: 256 }}
            alt="Imagen de alumnos"
            loading="lazy"
          />
        </div>
        <Link
          href="/admin/alumno/lista/"
          class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2"
        >
          <div class="text-[28px] font-semibold capitalize text-white">
            Ver lista
          </div>
          <div class="relative h-8 w-8">
            <img src={Plus} width={32} height={32} />
          </div>
        </Link>

        <Link
          href="/admin/alumno/registro/"
          class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2"
        >
          <div class="text-[28px] font-semibold capitalize text-white">
            Agregar
          </div>
          <div class="relative h-8 w-8">
            <img src={Plus} width={32} height={32} />
          </div>
        </Link>
      </div>

      <div class="inline-flex w-72 flex-col items-center justify-start gap-[11px]">
        <div>
          <div class="self-stretch text-center text-4xl font-normal text-black">
            Guardias
          </div>
          <ImageGuard
            style={{ width: 256, height: 256 }}
            alt="Imagen de guardias"
            loading="lazy"
          />
        </div>
        <Link
          href="/admin/guard/lista/"
          class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2"
        >
          <div class="text-[28px] font-semibold capitalize text-white">
            Ver lista
          </div>
          <div class="relative h-8 w-8">
            <img src={Plus} width={32} height={32} />
          </div>
        </Link>

        <Link
          href="/admin/guard/registro/"
          class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2"
        >
          <div class="text-[28px] font-semibold capitalize text-white">
            Agregar
          </div>
          <div class="relative h-8 w-8">
            <img src={Plus} width={32} height={32} />
          </div>
        </Link>
      </div>
    </main>
  );
});
