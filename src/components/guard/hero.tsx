import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { usePickupData } from "~/routes/guard";

export default component$(() => {
  const pickupData = usePickupData();
  const filteredPickupData = useSignal(pickupData.value);

  const query = useSignal("");

  useTask$(({ track }) => {
    track(() => query.value);
    track(() => pickupData.value);

    const value = query.value;

    if (value === "") {
      filteredPickupData.value = pickupData.value;
    } else {
      filteredPickupData.value = pickupData.value.filter((data) =>
        data.student.ci.includes(value),
      );
    }
  });

  return (
    <main class="mt-10 flex w-full flex-col gap-6 px-[180px]">
      <h1 class="text-center text-4xl font-normal text-black">
        Lista de Alumnos
      </h1>

    <div class="flex items-center justify-center">
      <Link href="/guard/registrar/" class="w-48 flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2">
        <div class="text-lg font-semibold capitalize text-white">
          Registrar salida
        </div>
      </Link>
    </div>

      <input
        type="text"
        placeholder="Buscar alumno por cédula"
        class="rounded-lg border border-gray-300 px-4 py-2"
        bind:value={query}
      />

      <div class="overflow-x-auto overflow-y-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Cédula
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Cédula Persona Autorizada
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Estado
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            {filteredPickupData.value.length === 0 ? (
              <tr>
                <td class="px-6 py-4 text-center text-gray-500" colSpan={4}>
                  No hay alumnos disponibles
                </td>
              </tr>
            ) : (
              filteredPickupData.value.map((data) => (
                <tr key={data.id}>
                  <td class="whitespace-nowrap px-6 py-4">
                    {data.student.fullName}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">{data.student.ci}</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {data.authorizedPerson.ci}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {data.isPickedUp ? <p>Retirado</p> : <p>No retirado</p>}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="flex space-x-4">
                      {data.isPickedUp ? (
                        <button
                          disabled={true}
                          class="flex cursor-not-allowed items-center gap-2 rounded bg-gray-500 px-4 py-2 text-white"
                        >
                          <div class="text-sm font-semibold">Retirar</div>
                        </button>
                      ) : (
                        <button class="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white">
                          <div class="text-sm font-semibold">Retirar</div>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
});
