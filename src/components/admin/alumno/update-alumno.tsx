import { $, component$, useSignal } from "@builder.io/qwik";
import { Form, Link, useNavigate } from "@builder.io/qwik-city";
import { Modal } from "~/components/shared/modal/modal";
import { useAlumnoUpdate } from "~/routes/admin/alumno/[id]";

export interface UpdateAlumnoProps {
  fullName: string;
  ci: string;
  ci_tutor: string;
}

export default component$(({ fullName, ci, ci_tutor }: UpdateAlumnoProps) => {
  const errorFlag = useSignal(false);
  const errorMessage = useSignal("");

  const action = useAlumnoUpdate();

  const nav = useNavigate();

  const modalVisible = useSignal(false);

  // Modal functions
  const showModal = $(() => {
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
    nav("/admin/alumno/lista/");
  });

  return (
    <>
      <Form
        action={action}
        onSubmitCompleted$={() => {
          if (action.value?.success === false) {
            errorFlag.value = true;
            errorMessage.value = action.value.message;
          }

          if (action.value?.success === true) {
            showModal();
          }
        }}
        class="inline-flex w-full flex-col items-center justify-center gap-[33px] px-[180px]"
      >
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
            id="fullName"
            name="fullName"
            placeholder="Primero Segundo"
            value={fullName}
            class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
          />
        </div>
        {action.value?.failed && (
          <p class="text-sm font-semibold text-red-500">
            {action.value.fieldErrors.fullName}
          </p>
        )}
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
            value={ci}
            class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
          />
        </div>
        {action.value?.failed && (
          <p class="text-sm font-semibold text-red-500">
            {action.value.fieldErrors.ci}
          </p>
        )}
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
            value={ci_tutor}
            class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
          />
        </div>
        {action.value?.failed && (
          <p class="text-sm font-semibold text-red-500">
            {action.value.fieldErrors.ci_tutor}
          </p>
        )}

        {errorFlag.value && (
          <p class="text-sm font-semibold text-red-500">{errorMessage.value}</p>
        )}

        <div class="inline-flex items-center justify-start gap-24">
          <button class="flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2">
            <div class="text-[28px] font-semibold capitalize text-white">
              Actualizar
            </div>
          </button>
          <Link
            href="/admin/alumno/lista/"
            class="flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2"
          >
            <div class="text-[28px] font-semibold capitalize text-white">
              Cancelar
            </div>
          </Link>
        </div>
      </Form>

      <Modal showModal={modalVisible.value} closeFn={closeModal}>
        <div q:slot="title">Operación Exitosa</div>
        <div q:slot="content">Alumno actualizado</div>
      </Modal>
    </>
  );
});
