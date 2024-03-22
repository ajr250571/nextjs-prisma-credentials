"use client";
import { signOut } from "next-auth/react";

function HomePage() {
  return (
    <div>
      <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <div>
          <h1 className="text-3xl text-primary font-bold">Panpack S.A.</h1>
          <p>Toma Rendimiento Elitex</p>
          <p>Autor: Armando Rodriguez</p>
          <button className="btn btn-secondary mt-4" onClick={() => signOut()}>
            Desconectar
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
