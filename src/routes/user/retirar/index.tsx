import { component$ } from "@builder.io/qwik";
import Navbar from "~/components/users/navbar";
import Retiro from "~/components/users/retiro";

const alumnos = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "María López" },
  // más alumnos...
];

const responsables = [
  { id: 1, nombre: "Carlos Sánchez" },
  { id: 2, nombre: "Ana Martínez" },
  // más responsables...
];

export default component$(() => {
  return (
    <main class="flex flex-col items-center justify-center">
      <Navbar />
      <Retiro alumnos={alumnos} responsables={responsables} />
    </main>
  );
});