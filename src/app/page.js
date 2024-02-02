"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data, status } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center "
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <header className=" p-10 ">
        <nav className="container mx-auto flex justify-between items-center w-95 ">
          {status === "authenticated" ? (
            <div className="text-white">
              <p>Welcome, {data.user.name}!</p>
              <p>Email: {data.user.email}</p>

              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-3 py-1 rounded-md mt-2"
              >
                Sign out
              </button>
            </div>
          ) : (
            <p className="text-white">
              You are not Signed In <br />
              <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-2">
                <Link href="/login">Sign In</Link>
              </button>
            </p>
          )}
        </nav>
      </header>
    </div>
  );
}
