import { $, component$, useSignal } from "@builder.io/qwik";
import { Form, Link, useNavigate } from "@builder.io/qwik-city";
import { Modal } from "~/components/shared/modal/modal";
import { useAlumnoForm } from "~/routes/admin/alumno/registro";

export default component$(() => {
  const errorFlag = useSignal(false);
  const errorMessage = useSignal("");

  const action = useAlumnoForm();

  const nav = useNavigate();

  const modalVisible = useSignal(false);

  // Modal functions
  const showModal = $(() => {
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
    nav("/admin/dashboard/");
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
            id="nombres"
            name="nombres"
            placeholder="Primero Segundo"
            class="flex h-10 w-1/2 items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
          />
        </div>
        {action.value?.failed && (
          <p class="text-sm font-semibold text-red-500">
            {action.value.fieldErrors.nombres}
          </p>
        )}
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
        {action.value?.failed && (
          <p class="text-sm font-semibold text-red-500">
            {action.value.fieldErrors.apellidos}
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

      <Modal showModal={modalVisible.value} closeFn={closeModal}>
        <div q:slot="title">Operación Exitosa</div>
        <div q:slot="content">Alumno agregado</div>
      </Modal>
    </>
  );
});
