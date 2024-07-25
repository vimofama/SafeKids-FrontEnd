import { component$ } from "@builder.io/qwik";
import CardResponsable from "./card-responsable";
import { Link } from "@builder.io/qwik-city";
import { useUserData } from "~/routes/user";
import { type UsersResponse } from "~/interfaces";

export default component$(() => {
  const user = useUserData().value as UsersResponse;

  return (
    <div class="inline-flex h-[592px] w-[360px] flex-col items-center justify-center gap-5 px-2">
      <h1 class="self-stretch text-center text-xl font-semibold text-black">
        Tutor Responsable
      </h1>
      <Link
        href="/user/retirar"
        class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1"
      >
        <p class="text-xl font-semibold capitalize text-white">Retirar</p>
      </Link>
      <Link
        href="/user/alumno"
        class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1"
      >
        <p class="text-xl font-semibold capitalize text-white">
          Alumno Registrado
        </p>
      </Link>
      <div class="flex h-[390px] flex-col items-center justify-center gap-2 self-stretch py-1">
        <h3 class="self-stretch text-center text-xl font-semibold capitalize text-black">
          Lista Personas Autorizadas
        </h3>
        <div class="overflow-y-scroll">
          {user.students?.map(({ authorizedPersons }) =>
            authorizedPersons.map(({ id, fullName, phone, ci }) => (
              <CardResponsable
                key={id}
                nombre={fullName}
                celular={phone}
                ci={ci}
              />
            )),
          )}
        </div>
        <Link
          href="/user/registro/"
          class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1"
        >
          <p class="text-xl font-semibold capitalize text-white">Agregar</p>
        </Link>
      </div>
    </div>
  );
});
