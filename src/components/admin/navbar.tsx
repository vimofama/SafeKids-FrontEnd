import { component$, $ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";

import ImageLogo from "../../media/logo-safekids.jpg?jsx";
import { useLogOut } from "~/routes/(auth)/login";

export default component$(() => {
  const nav = useNavigate();

  const action = useLogOut();

  const logout = $(() => {
    nav("/login");
  });

  return (
    <nav class="inline-flex h-[184px] w-full items-center justify-between px-[180px] py-7">
      <Link href="/admin/dashboard/" class="flex h-32 w-32 items-center justify-center">
        <ImageLogo
          style={{ width: "128px", height: "128px" }}
          loading="lazy"
          alt="Logo de SafeKids"
        />
      </Link>
      <h1 class="text-5xl font-bold text-black">Bienvenido</h1>
      <button
        onClick$={logout}
        class="flex items-center justify-center gap-4 rounded bg-white px-6 py-2"
      >
        <p class="text-[28px] font-semibold capitalize text-black">
          Cerrar sesión
        </p>
        <div class="relative h-8 w-8">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27.1562 15.2437L15.35 4.99687C15.2594 4.91875 15.1438 4.875 15.0219 4.875H12.2563C12.025 4.875 11.9187 5.1625 12.0938 5.3125L23.0375 14.8125H4.75C4.6125 14.8125 4.5 14.925 4.5 15.0625V16.9375C4.5 17.075 4.6125 17.1875 4.75 17.1875H23.0344L12.0906 26.6875C11.9156 26.8406 12.0219 27.125 12.2531 27.125H15.1125C15.1719 27.125 15.2312 27.1031 15.275 27.0625L27.1562 16.7563C27.2644 16.6622 27.3512 16.546 27.4106 16.4155C27.4701 16.2851 27.5008 16.1434 27.5008 16C27.5008 15.8566 27.4701 15.7149 27.4106 15.5845C27.3512 15.454 27.2644 15.3378 27.1562 15.2437Z"
              fill="black"
            ></path>
          </svg>
        </div>
      </button>
    </nav>
  );
});
