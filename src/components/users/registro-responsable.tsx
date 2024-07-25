import { $, component$, useSignal } from "@builder.io/qwik";
import { Form, useNavigate } from "@builder.io/qwik-city";
import { useCreateAuthorizedPerson } from "~/routes/user/registro";
import { Modal } from "../shared/modal/modal";

export default component$(() => {
  const action = useCreateAuthorizedPerson();
  const nav = useNavigate();

  const errorFlag = useSignal(false);
  const messageError = useSignal("");
  const modalVisible = useSignal(false);

  // Modal functions
  const showModal = $(() => {
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
    nav("/user");
  });

  return (
    <>
      <Form
        action={action}
        onSubmit$={() => {
          if (action.value?.success == false) {
            errorFlag.value = true;
            messageError.value = action.value.message;
          }
          if (action.value?.success == true) {
            modalVisible.value = true;
          }
        }}
        class="inline-flex h-[592px] w-[360px] flex-col items-center justify-center gap-[13px]"
      >
        <div class="self-stretch text-center text-xl font-semibold text-black">
          Registro Personas Autorizadas
        </div>
        <div class="flex h-[100px] flex-col items-start justify-center gap-3 self-stretch px-4 py-3">
          <label for="nombres" class="text-xl font-semibold text-black">
            Nombres
          </label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            placeholder="Nombre Apellido"
            class="inline-flex items-center justify-between self-stretch rounded-lg border border-black px-[13px] py-2"
          />
        </div>
        {action.value?.failed && (
          <p class="text-sm font-semibold text-red-500">
            {action.value.fieldErrors.nombres}
          </p>
        )}
        <div class="flex h-[100px] flex-col items-start justify-center gap-3 self-stretch px-4 py-3">
          <label for="ci" class="text-xl font-semibold text-black">
            No Cédula
          </label>
          <input
            type="text"
            id="ci"
            name="ci"
            placeholder="1999999999"
            class="inline-flex items-center justify-between self-stretch rounded-lg border border-black px-[13px] py-2"
          />
        </div>
        {action.value?.failed && (
          <p class="text-sm font-semibold text-red-500">
            {action.value.fieldErrors.ci}
          </p>
        )}
        <div class="flex h-[100px] flex-col items-start justify-center gap-3 self-stretch px-4 py-3">
          <label for="celular" class="text-xl font-semibold text-black">
            Celular
          </label>
          <input
            type="text"
            id="celular"
            name="celular"
            placeholder="0999999999"
            class="inline-flex items-center justify-between self-stretch rounded-lg border border-black px-[13px] py-2"
          />
        </div>
        {action.value?.failed && (
          <p class="text-sm font-semibold text-red-500">
            {action.value.fieldErrors.celular}
          </p>
        )}
        <div class="inline-flex items-center justify-center gap-8">
          <button
            type="submit"
            class="flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1"
          >
            <div class="text-xl font-semibold capitalize text-white">
              registrar
            </div>
          </button>
          <a
            href="/user"
            class="flex items-center justify-center gap-4 rounded bg-blue-500 px-3 py-1"
          >
            <div class="text-xl font-semibold capitalize text-white">
              cancelar
            </div>
          </a>
        </div>
      </Form>

      <Modal showModal={modalVisible.value} closeFn={closeModal}>
        <div q:slot="title">Operacion Exitosa</div>
        <div q:slot="content">Responsable agregado</div>
      </Modal>
    </>
  );
});
