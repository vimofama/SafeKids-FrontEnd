import { component$ } from "@builder.io/qwik";

const alumnos = [
  {
    id: "1",
    nombre: "Ana Pérez",
    cedular: "0987654321",
    cedulaPadre: "12345678",
    status: true,
  },
  {
    id: "2",
    nombre: "Carlos Sánchez",
    cedular: "0987654322",
    cedulaPadre: "23456789",
    status: false,
  },
  {
    id: "3",
    nombre: "María Gómez",
    cedular: "0987654323",
    cedulaPadre: "34567890",
    status: true,
  },
  {
    id: "4",
    nombre: "Luis Díaz",
    cedular: "0987654324",
    cedulaPadre: "45678901",
    status: false,
  },
  {
    id: "5",
    nombre: "Patricia López",
    cedular: "0987654325",
    cedulaPadre: "56789012",
    status: true,
  },
  {
    id: "6",
    nombre: "Patricia López",
    cedular: "0987654325",
    cedulaPadre: "56789012",
    status: false,
  },
  {
    id: "7",
    nombre: "Patricia López",
    cedular: "0987654325",
    cedulaPadre: "56789012",
    status: true,
  },
  {
    id: "8",
    nombre: "Patricia López",
    cedular: "0987654325",
    cedulaPadre: "56789012",
    status: false,
  },
  {
    id: "9",
    nombre: "Patricia López",
    cedular: "0987654325",
    cedulaPadre: "56789012",
    status: true,
  },
];

export default component$(() => {
  return (
    <main class="mt-10 flex w-full flex-col gap-6 px-[180px]">
      <h1 class="text-center text-4xl font-normal text-black">
        Lista de Alumnos
      </h1>

      <input
        type="text"
        placeholder="Buscar alumno..."
        class="rounded-lg border border-gray-300 px-4 py-2"
      />

      <div class="overflow-x-auto overflow-y-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Nombre
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Celular
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Cédula Padre
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
            {alumnos.length === 0 ? (
              <tr>
                <td class="px-6 py-4 text-center text-gray-500" colSpan={4}>
                  No hay alumnos disponibles
                </td>
              </tr>
            ) : (
              //TODO: Ordenar por status, mostrando primero los alumnos no retirados
              alumnos.map((alumno) => (
                <tr key={alumno.id}>
                  <td class="whitespace-nowrap px-6 py-4">{alumno.nombre}</td>
                  <td class="whitespace-nowrap px-6 py-4">{alumno.cedular}</td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {alumno.cedulaPadre}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    {alumno.status ? <p>Retirado</p> : <p>No retirado</p>}
                  </td>
                  <td class="whitespace-nowrap px-6 py-4">
                    <div class="flex space-x-4">
                      {alumno.status ? (
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
