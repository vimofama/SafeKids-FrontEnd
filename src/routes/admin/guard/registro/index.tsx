import { component$ } from "@builder.io/qwik";
import { routeAction$, z, zod$ } from "@builder.io/qwik-city";
import axios from "axios";
import RegisterGuardia from "~/components/admin/guard/register-guardia";
import Navbar from "~/components/admin/navbar";

export const useRegisterGuardiaAction = routeAction$(
  async (data, { cookie, redirect }) => {
    const { nombres, apellidos, ci, celular, email, password, password2 } =
      data;
    try {
      if (password !== password2) {
        throw new Error("Las contraseñas no coinciden");
      }

      console.log(`Cookie: ${JSON.stringify(cookie.getAll())}`);

      const jwt = cookie.get("jwt");

      if (!jwt) {
        console.log(`No JWT found in cookies`);
        return redirect(302, "/login");
      }

      const guardResponse = await axios.post(
        "http://localhost:3005/users/register",
        {
          fullName: `${nombres} ${apellidos}`,
          ci,
          phone: celular,
          email,
          password,
          userRole: "Personal de seguridad",
        },
        { headers: { Authorization: `Bearer ${jwt.value}` } },
      );

      console.log(`Guard response: ${guardResponse}`);

      if (guardResponse.status === 201) {
        return redirect(302, "/admin/dashboard");
      }

      return {
        success: true,
        message: "Guardia registrado exitosamente",
      };
    } catch (error) {
      console.log(`Error registering guardia: ${error}`);
      return {
        success: false,
        message: JSON.stringify(error),
      };
    }
  },
  zod$({
    nombres: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    apellidos: z
      .string()
      .min(3, "El apellido debe tener al menos 3 caracteres"),
    ci: z.string().length(10, "La cédula debe tener 10 dígitos"),
    celular: z.string().length(10, "El celular debe tener 10 dígitos"),
    email: z.string().email("Formato no valido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    password2: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
  }),
);

export default component$(() => {
  return (
    <>
      <Navbar />
      <RegisterGuardia />
    </>
  );
});
