"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export default function Home() {
  const { data: session, status } = useSession();

  const { data: posts, error } = useSWR(
    status === "authenticated"
      ? "https://jsonplaceholder.typicode.com/posts"
      : null,
    fetcher
  );

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }}
    >
      <header className="p-10">
        <nav className="container mx-auto flex justify-between items-center w-95">
          {status === "authenticated" ? (
            <div className="text-black">
              {session ? (
                <>
                  <p>Welcome, {session.user.name}!</p>
                  <p>Email: {session.user.email}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}

              {posts ? (
                <div>
                  <h2 className="text-3xl font-bold mb-4">Latest Posts:</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.slice(0, 10).map((post) => (
                      <div
                        key={post.id}
                        className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                      >
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p>{post.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>Loading posts...</p>
              )}

              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-3 py-1 rounded-md mt-4"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">
                Explore Great Content!
              </h2>
              <p>
                Sign in to access personalized content, save your favorites, and
                engage with the community.
              </p>
              <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-4">
                <Link href="/login">Sign In Now</Link>
              </button>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}
