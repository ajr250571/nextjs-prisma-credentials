"use client";
import { signOut } from "next-auth/react";

function DashboardPage() {
  return (
    <div>
      <section className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <div>
          <h1 className="text-4xl text-primary font-bold">Dashboard</h1>
          <button className="btn btn-secondary mt-4" onClick={() => signOut()}>
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
