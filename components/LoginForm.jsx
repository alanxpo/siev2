"use client";

import { IconExclamationCircle, IconLock, IconX } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IconMail, IconPassword } from "@tabler/icons-react";

import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  //Usuario de prueba
  //email: pruebatest@gmail.com
  //contraseña: secretito0

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      id,
      password,
      redirect: false,
    });

    if (res.error) {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 10000);
    } else {
      router.push("/sie");
    }
  };

  return (
    <section className="flex flex-col space-y-4 bg-white shadow-md w-full min-[520px]:w-[90%] h-fit px-4 min-[520px]:px-8 py-8 md:p-12 rounded-lg max-w-2xl mx-4">
      <h2 className="font-bold text-3xl min-[520px]:text-4xl text-center my-2">
        Iniciar sesión
      </h2>
      {errorMessage && (
        <div className="flex flex-row items-center justify-between border border-[#c1121f] bg-[#ffe3e0] text-[#691e06] font-medium p-2 rounded-md ">
          <div className="flex flex-row gap-1 items-center">
            <IconExclamationCircle color="#c1121f" />
            <p>Datos de ingreso incorrectos.</p>
          </div>
          <button
            onClick={() => setErrorMessage(!errorMessage)}
            className="transition-colors hover:bg-white/20 rounded-full p-1"
          >
            <IconX color="#c1121f" />
          </button>
        </div>
      )}
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col items-start space-y-2 w-full"
      >
        <div className="space-y-2 block relative w-full">
          <label
            htmlFor="email"
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Número de control
          </label>

          <input
            required={true}
            type="text"
            id="email"
            maxLength={10}
            className="form-input"
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></input>

          <label
            htmlFor="password"
            className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2"
          >
            Clave de acceso
          </label>

          <input
            required={true}
            type="password"
            id="password"
            maxLength={10}
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button
          type="submit"
          className="bg-[#8D0D30] w-full mx-auto px-6 py-2 rounded text-white text-sm font-semibold"
        >
          Ingresar
        </button>
      </form>

      <Link
        href=""
        className="text-sm text-left text-[#12322B] font-medium hover:text-blue-600"
      >
        Recuperar clave de acceso
      </Link>
    </section>
  );
}
