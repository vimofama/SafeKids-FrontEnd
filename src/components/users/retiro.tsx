import { component$, useSignal, useTask$ } from "@builder.io/qwik";

export interface RetiroProps {
  alumnos: any[];
  responsables: any[];
}

export default component$(({ alumnos, responsables }: RetiroProps) => {
  const date = useSignal(new Date().toISOString().split("T")[0]);

  return (
    <div class="flex h-[592px] w-[360px] flex-col items-center justify-center gap-[13px]">
      <h1 class="self-stretch text-center text-xl font-semibold text-black">
        Retirar Alumno
      </h1>

      <div class="flex h-[100px] flex-col items-start justify-center gap-3 self-stretch px-4 py-3">
        <label class="text-xl font-semibold text-black">Alumno</label>
        <div class="flex items-center justify-between self-stretch rounded-lg border border-black px-[13px] py-2">
          <select class="w-full border-none bg-transparent outline-none">
            <option value="default">Seleccione un alumno</option>
            {alumnos.map((alumno: any) => (
              <option key={alumno.id} value={alumno.id}>{alumno.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div class="flex h-[100px] flex-col items-start justify-center gap-3 self-stretch px-4 py-3">
        <label class="text-xl font-semibold text-black">Responsable</label>
        <div class="flex items-center justify-between self-stretch rounded-lg border border-black px-[13px] py-2">
          <select class="w-full border-none bg-transparent outline-none">
            <option value="default">Seleccione un responsable</option>
            {responsables.map((responsable: any) => (
              <option key={responsable.id} value={responsable.id}>{responsable.nombre}</option>
            ))}
          </select>
        </div>
      </div>

      <div class="flex h-[100px] flex-col items-start justify-center gap-3 self-stretch px-4 py-3">
        <label class="text-xl font-semibold text-black">Fecha</label>
        <input
          type="date"
          class="w-full rounded-lg border border-black px-[13px] py-2"
          value={date.value}
        />
      </div>

      <div class="flex items-center justify-center gap-8">
        <button class="flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1">
          <div class="text-xl font-semibold capitalize text-white">Aceptar</div>
        </button>
        <a
          href="/user"
          class="flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1"
        >
          <div class="text-xl font-semibold capitalize text-white">
            Cancelar
          </div>
        </a>
      </div>
    </div>
  );
});
