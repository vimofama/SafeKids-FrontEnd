import { component$ } from "@builder.io/qwik";
import { Form, routeAction$, zod$, z } from "@builder.io/qwik-city";

// import Image from "../../../media/logo-safekids.jpg?jsx";
import Image from "~/media/logo-safekids.jpg?jsx";
import axios from "axios";
import { LoginExitResponse, LoginFailResponse } from "~/interfaces";

export const useLoginUserAction = routeAction$(
  async (data, { cookie, redirect }) => {
    const { email, password } = data;

    try {
      const response = await axios.post("http://localhost:3005/users/login", {
        email,
        password,
      });

      const data: LoginExitResponse = response.data;
      cookie.set("jwt", data.jwt);

      if (data.userRole === "Administrador") {
        redirect(302, "/admin/dashboard");
      }

      if (data.userRole === "Tutor") {
        redirect(302, "/user");
      }

      return { success: true }; // Retorna éxito si todo va bien

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
  const action = useLoginUserAction();

  return (
    <Form action={action} class="flex items-center justify-center">
      <div class="inline-flex h-screen flex-col items-center justify-center bg-white">
        <div class="inline-flex shrink grow basis-0 flex-col items-center justify-start gap-6 px-7 py-5">
          <h1 class="text-4xl font-bold text-black lg:text-5xl">
            Iniciar Sesión
          </h1>

          <div class="inline-flex h-32 w-32 items-center justify-center">
            <Image style={{ width: "128px", height: "128px" }} loading="lazy"/>
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

          <p class="cursor-pointer self-stretch text-right text-xl font-normal text-black hover:underline">
            Recuperar contraseña
          </p>

          {action.value?.success && (
            <p class="text-xl font-semibold text-red-500">
              {action.value?.message}
            </p>
          )}

          <div class="inline-flex items-center justify-center gap-4 rounded bg-blue-500 px-6 py-2">
            <button class="text-[28px] font-semibold capitalize text-white">
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </Form>
  );
});
