import { component$ } from "@builder.io/qwik";
import { Form, Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <Form
      class="inline-flex w-full flex-col items-center justify-center gap-[33px] px-[180px]"
    >
      <h1 class="text-[28px] font-semibold capitalize text-black">
        Registro de tutor
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
          placeholder="9999999999"
          class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      <div class="inline-flex w-[610px] items-center justify-between">
        <label
          for="celular"
          class="shrink grow basis-0 text-xl font-semibold text-black"
        >
          Celular
        </label>
        <input
          type="text"
          id="celular"
          name="celular"
          placeholder="0999999999"
          class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      <div class="inline-flex w-[610px] items-center justify-between">
        <label
          for="email"
          class="shrink grow basis-0 text-xl font-semibold text-black"
        >
          Correo
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="test@test.com"
          class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      <div class="inline-flex w-[610px] items-center justify-between">
        <label
          for="password"
          class="shrink grow basis-0 text-xl font-semibold text-black"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="********"
          class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      <div class="inline-flex w-[610px] items-center justify-between">
        <label
          for="password2"
          class="shrink grow basis-0 text-xl font-semibold text-black"
        >
          Confirmar Contraseña
        </label>
        <input
          type="password"
          id="password2"
          name="password2"
          placeholder="********"
          class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
        />
      </div>
      {/* {errorFlag && (
        <p class="text-xl font-semibold text-red-500">{messageError}</p>
      )} */}
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