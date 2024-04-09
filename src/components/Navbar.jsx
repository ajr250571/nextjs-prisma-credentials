import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);

  // console.log(session);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="text-xl btn btn-ghost">
          PANPACK SA
        </Link>
      </div>
      <div className="flex-none">
        <ul className="px-1 menu menu-horizontal">
          {!session?.user ? (
            <>
              <li>
                <Link href="/auth/login">Conectar</Link>
              </li>
              <li>
                <Link href="/auth/register">Registrarse</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/elitex">Elitex</Link>
              </li>
              <li>
                <Link href="/api/auth/signout">Desconectar</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
