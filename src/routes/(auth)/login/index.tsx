import { $, component$, useSignal } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  zod$,
  z,
  useNavigate,
  globalAction$,
  DocumentHead,
} from "@builder.io/qwik-city";

import Image from "~/media/logo-safekids.jpg?jsx";
import axios from "axios";
import type { LoginExitResponse, LoginFailResponse } from "~/interfaces";
import { Modal } from "~/components/shared/modal/modal";

export const useLogOut = globalAction$((_, { cookie }) => {
  cookie.delete("jwt");
  cookie.delete("csrf");
  cookie.delete("userId");

  return;
});

export const useLoginUserAction = routeAction$(
  async (data, { cookie, env }) => {
    const { email, password } = data;

    try {
      const response = await axios.post(`${env.get("API_URL")}/users/login`, {
        email,
        password,
      });

      const data: LoginExitResponse = response.data;

      if (data.userRole === "Administrador") {
        cookie.set("jwt", data.jwt, { path: "/admin", httpOnly: true });
        cookie.set("userId", data.id, { path: "/admin", httpOnly: true });
      }

      if (data.userRole === "Tutor") {
        cookie.set("jwt", data.jwt, { path: "/user", httpOnly: true });
        cookie.set("userId", data.id, { path: "/user", httpOnly: true });
      }

      if (data.userRole === "Personal de seguridad") {
        cookie.set("jwt", data.jwt, { path: "/guard", httpOnly: true });
        cookie.set("userId", data.id, { path: "/guard", httpOnly: true });
      }

      return {
        success: true,
        message: "Usuario logueado exitosamente",
        userRole: data.userRole,
      };
    } catch (error: any) {
      const data: LoginFailResponse = error.response.data;
      return {
        success: false,
        message: data.message,
      };
    }
  },
  zod$({
    email: z.string().email("Formato no valido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
  }),
);

export default component$(() => {
  const nav = useNavigate();
  const action = useLoginUserAction();

  const modalVisible = useSignal(false);

  const showModal = $(() => {
    modalVisible.value = true;
  });

  const closeModal = $(() => {
    modalVisible.value = false;
  });

  return (
    <>
      <Form
        action={action}
        onSubmitCompleted$={() => {
          if (action.value?.success) {
            if (action.value.userRole === "Administrador") {
              nav("/admin/dashboard/");
            }

            if (action.value.userRole === "Tutor") {
              nav("/user/");
            }

            if (action.value.userRole === "Personal de seguridad") {
              nav("/guard/");
            }
          }
        }}
        class="flex items-center justify-center"
      >
        <div class="inline-flex h-screen flex-col items-center justify-center bg-white">
          <div class="inline-flex shrink grow basis-0 flex-col items-center justify-start gap-6 px-7 py-5">
            <h1 class="text-4xl font-bold text-black lg:text-5xl">
              Iniciar Sesión
            </h1>

            <div class="inline-flex h-32 w-32 items-center justify-center">
              <Image
                style={{ width: "128px", height: "128px" }}
                loading="lazy"
              />
            </div>

            <label
              for="email"
              class="self-stretch text-xl font-semibold text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="test@test.com"
              class="inline-flex w-[304px] items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
            />

            {action.value?.failed && (
              <p class="text-sm font-semibold text-red-500">
                {action.value.fieldErrors.email}
              </p>
            )}

            <label
              for="password"
              class="self-stretch text-xl font-semibold text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              class="inline-flex w-[304px] items-center justify-start gap-2.5 rounded-lg border border-black px-[13px] py-2"
            />

            {action.value?.failed && (
              <p class="text-sm font-semibold text-red-500">
                {action.value.fieldErrors.password}
              </p>
            )}

            <p
              onClick$={() => {showModal()}}
              class="cursor-pointer self-stretch text-right text-xl font-normal text-black hover:underline"
            >
              Recuperar contraseña
            </p>

            {!action.value?.success && (
              <p class="text-xl font-semibold text-red-500">
                {action.value?.message}
              </p>
            )}

            <div class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2">
              <button
                type="submit"
                class="text-[28px] font-semibold capitalize text-white"
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </Form>

      <Modal showModal={modalVisible.value} closeFn={closeModal}>
        <div q:slot="title">Infomación</div>
        <div q:slot="content">Hablar con el admnistrados del sistema</div>
      </Modal>
    </>
  );
});


export const head: DocumentHead = {
  title: "Login"
}