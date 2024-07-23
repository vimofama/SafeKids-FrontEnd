import { component$ } from "@builder.io/qwik";

const guardias = [
  {
    id: "1",
    nombre: "Ana García",
    correo: "ana.garcia@example.com",
    cedula: "12345678",
    celular: "0987654321",
  },
  {
    id: "2",
    nombre: "Carlos Martínez",
    correo: "carlos.martinez@example.com",
    cedula: "23456789",
    celular: "0987654322",
  },
  {
    id: "3",
    nombre: "María López",
    correo: "maria.lopez@example.com",
    cedula: "34567890",
    celular: "0987654323",
  },
  {
    id: "4",
    nombre: "Luis Fernández",
    correo: "luis.fernandez@example.com",
    cedula: "45678901",
    celular: "0987654324",
  },
  {
    id: "5",
    nombre: "Patricia Romero",
    correo: "patricia.romero@example.com",
    cedula: "56789012",
    celular: "0987654325",
  },
];

export default component$(() => {
  return (
    <main class="mt-10 flex w-[1440px] flex-col gap-6 px-[180px]">
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
            {guardias.length === 0 ? (
              <tr>
                <td class="px-6 py-4 text-center text-gray-500">
                  No hay guardias disponibles
                </td>
              </tr>
            ) : (
              guardias.map((guardia) => (
                <tr key={guardia.id}>
                  <td class="whitespace-nowrap px-6 py-4">{guardia.nombre}</td>
                  <td class="whitespace-nowrap px-6 py-4">{guardia.correo}</td>
                  <td class="whitespace-nowrap px-6 py-4">{guardia.cedula}</td>
                  <td class="whitespace-nowrap px-6 py-4">{guardia.celular}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
});