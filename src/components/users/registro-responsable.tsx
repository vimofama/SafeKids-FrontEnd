import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="inline-flex h-[592px] w-[360px] flex-col items-center justify-center gap-[13px]">
      <div class="self-stretch text-center text-xl font-semibold text-black">
        Registro Personas Autorizadas
      </div>
      <div class="flex h-[100px] flex-col items-start justify-center gap-3 self-stretch px-4 py-3">
        <label for="nombres" class="text-xl font-semibold text-black">
          Nombres
        </label>
        <input
          type="text"
          id="nombres"
          name="nombres"
          placeholder="Nombre Apellido"
          class="inline-flex items-center justify-between self-stretch rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      <div class="flex h-[100px] flex-col items-start justify-center gap-3 self-stretch px-4 py-3">
        <label for="ci" class="text-xl font-semibold text-black">
          No Cédula
        </label>
        <input
          type="text"
          id="ci"
          name="ci"
          placeholder="1999999999"
          class="inline-flex items-center justify-between self-stretch rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      <div class="flex h-[100px] flex-col items-start justify-center gap-3 self-stretch px-4 py-3">
        <label for="celular" class="text-xl font-semibold text-black">
          Celular
        </label>
        <input
          type="text"
          id="celular"
          name="celular"
          placeholder="0999999999"
          class="inline-flex items-center justify-between self-stretch rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      <div class="inline-flex items-center justify-center gap-8">
        <button class="flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1">
          <div class="text-xl font-semibold capitalize text-white">
            registrar
          </div>
        </button>
        <a
          href="/user"
          class="flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1"
        >
          <div class="text-xl font-semibold capitalize text-white">
            cancelar
          </div>
        </a>
      </div>
    </div>
  );
});