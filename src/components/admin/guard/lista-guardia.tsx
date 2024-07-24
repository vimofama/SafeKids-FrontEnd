import { component$ } from "@builder.io/qwik";
import { useUsersData } from "~/routes/admin/guard/lista"; 

export default component$(() => {

  const guardias = useUsersData();

  return (
    <main class="mt-10 flex w-full flex-col gap-6 px-[180px]">
      <h1 class="text-center text-4xl font-normal text-black">
        Lista de Tutores
      </h1>

      <input
        type="text"
        placeholder="Buscar alumno..."
        class="rounded-lg border border-gray-300 px-4 py-2"
      />

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Correo
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Cédula
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Celular
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            {guardias.value.length === 0 ? (
              <tr>
                <td class="px-6 py-4 text-center text-gray-500">
                  No hay guardias disponibles
                </td>
              </tr>
            ) : (
              guardias.value.map((guardia) => {
                if (guardia.userRole === "Personal de seguridad") {
                  return (
                    <tr key={guardia.id}>
                      <td class="whitespace-nowrap px-6 py-4">
                        {guardia.fullName}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        {guardia.email}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        {guardia.ci}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        {guardia.phone}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">
                        <div class="flex space-x-4">
                          <button class="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white">
                            <div class="text-sm font-semibold">Editar</div>
                          </button>
                          <button class="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white">
                            <div class="text-sm font-semibold">Eliminar</div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              })
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
});