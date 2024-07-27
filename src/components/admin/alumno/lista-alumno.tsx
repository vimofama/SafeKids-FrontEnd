import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useStudentsData } from "~/routes/admin/alumno/lista";

export default component$(() => {

  const alumnos = useStudentsData();
  const filteredAlumnos = useSignal(alumnos.value);

  const query = useSignal("");

  useTask$(({track}) => {
    track(() => query.value);
    track(() => alumnos.value);

    const value = query.value;

    if (value === "") {
      filteredAlumnos.value = alumnos.value;
    } else {
      filteredAlumnos.value = alumnos.value.filter((alumno) =>
        alumno.ci.includes(value),
      );
    }
  });

  return (
    <main class="mt-10 flex w-full flex-col gap-6 px-[180px]">
      <h1 class="text-center text-4xl font-normal text-black">
        Lista de Alumnos
      </h1>

      <input
        type="text"
        placeholder="Buscar alumno por cédula"
        class="rounded-lg border border-gray-300 px-4 py-2"
        bind:value={query}
      />

      <div class="overflow-x-auto">
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
                Cédula Padre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            {filteredAlumnos.value.length === 0 ? (
              <tr>
                <td class="px-6 py-4 text-center text-gray-500" colSpan={4}>
                  No hay alumnos disponibles
                </td>
              </tr>
            ) : (
              filteredAlumnos.value.map((alumno) => (
                <tr key={alumno.id}>
                  <td class="whitespace-nowrap px-6 py-4">{alumno.fullName}</td>
                  <td class="whitespace-nowrap px-6 py-4">{alumno.ci}</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {alumno.guardian.ci}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="flex space-x-4">
                      <Link
                        href={`/admin/alumno/${alumno.id}`}
                        class="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white"
                      >
                        <div class="text-sm font-semibold">Editar</div>
                      </Link>
                      <button class="cursor-not-allowed flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white">
                        <div class="text-sm font-semibold">Eliminar</div>
                      </button>
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