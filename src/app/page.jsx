"use client";
import { signOut } from "next-auth/react";

function HomePage() {
  return (
    <div>
      <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <div>
          <h1 className="text-4xl text-primary font-bold">Home Page</h1>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
