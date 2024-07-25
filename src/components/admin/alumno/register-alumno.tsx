import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <Form class="inline-flex w-full flex-col items-center justify-center gap-[33px] px-[180px]">
      <h1 class="text-[28px] font-semibold capitalize text-black">
        Registro de alumno
      </h1>
      <div class="inline-flex w-[610px] items-center justify-between">
        <label
          for="nombres"
          class="shrink grow basis-0 text-xl font-semibold text-black"
        >
          Nombres
        </label>
        <input
          type="text"
          id="nombres"
          name="nombres"
          placeholder="Primero Segundo"
          class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      <div class="inline-flex w-[610px] items-center justify-between">
        <label
          for="apellidos"
          class="shrink grow basis-0 text-xl font-semibold text-black"
        >
          Apellidos
        </label>
        <input
          type="text"
          id="apellidos"
          name="apellidos"
          placeholder="Primero Segundo"
          class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      <div class="inline-flex w-[610px] items-center justify-between">
        <label
          for="ci"
          class="shrink grow basis-0 text-xl font-semibold text-black"
        >
          No. Cédula
        </label>
        <input
          type="text"
          id="ci"
          name="ci"
          placeholder="1999999999"
          class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      <div class="inline-flex w-[610px] items-center justify-between">
        <label
          for="ci_tutor"
          class="shrink grow basis-0 text-xl font-semibold text-black"
        >
          No. Cédula del Tutor
        </label>
        <input
          type="text"
          id="ci_tutor"
          name="ci_tutor"
          placeholder="1899999999"
          class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
        />
      </div>

      <div class="inline-flex items-center justify-start gap-24">
        <button class="flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2">
          <div class="text-[28px] font-semibold capitalize text-white">
            Registrar
          </div>
        </button>
        <Link
          href="/admin/dashboard/"
          class="flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2"
        >
          <div class="text-[28px] font-semibold capitalize text-white">
            Cancelar
          </div>
        </Link>
      </div>
    </Form>
  );
});
