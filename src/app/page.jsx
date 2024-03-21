"use client";
import { signOut } from "next-auth/react";

function HomePage() {
  return (
    <div>
      <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <div>
          <h1 className="text-3xl text-primary font-bold">Rendimientos</h1>
          <p>Rendimientos Elitex</p>
          <p>Panpack S.A.</p>
          <p>Autor: Armando Rodriguez</p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
