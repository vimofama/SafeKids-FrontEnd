import { component$ } from "@builder.io/qwik";
import { usePickUpsData } from "~/routes/user/retirar";

export default component$(() => {
  const pickUps = usePickUpsData();

  return (
    <div class="flex h-[592px] w-[360px] flex-col items-center justify-center gap-[13px]">
      <h1 class="self-stretch text-center text-xl font-semibold text-black">
        Retirar Alumno
      </h1>

      <div class="flex h-[464px] w-full flex-col items-center justify-center overflow-hidden p-4">
        <h1 class="mb-4 text-2xl font-semibold text-black">Lista de Retiros</h1>
        <div class="w-full overflow-auto">
          <table class="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr class="border-b bg-gray-100">
                <th class="px-4 py-3 text-left text-sm font-semibold">
                  Persona
                </th>
                <th class="px-4 py-3 text-left text-sm font-semibold">
                  Alumno
                </th>
                <th class="px-4 py-3 text-left text-sm font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {pickUps.value.length === 0 ? (
                <tr>
                  <td class="px-4 py-3 text-sm" colSpan={3}>
                    No hay retiros
                  </td>
                </tr>
              ) : (
                pickUps.value.map((pick) => {
                  const date = new Date(pick.timestamp).toLocaleString("es-ES", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  });
                  return (
                    <tr class="border-b" key={pick.id}>
                      <td class="px-4 py-3 text-sm">
                        {pick.authorizedPerson.fullName}
                      </td>
                      <td class="px-4 py-3 text-sm">{pick.student.fullName}</td>
                      <td class="px-4 py-3 text-sm">{date}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex items-center justify-center gap-8">
        <a
          href="/user"
          class="flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1"
        >
          <div class="text-xl font-semibold capitalize text-white">
            Regresar
          </div>
        </a>
      </div>
    </div>
  );
});
