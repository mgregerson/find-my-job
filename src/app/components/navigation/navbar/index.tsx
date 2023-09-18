"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const navItems = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/job-board",
    name: "My Job Board",
  },
];

export default function NavBar() {
  let pathname = usePathname() || "/";

  const { data: session, status } = useSession();

  console.log("session=", session, "status=", status);

  return (
    <div
      id="navbar"
      className="border border-stone-800/90 p-[0.4rem] rounded-b-xl mb-12 sticky top-0 z-[100] bg-stone-900/80 backdrop-blur-md"
    >
      <nav className="flex gap-2 relative justify-start w-full z-[100]  rounded-lg">
        {navItems.map((item, index) => {
          const isActive = item.path === pathname;

          return (
            <Link
              key={item.path}
              className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                isActive ? "text-zinc-100" : "text-zinc-400"
              }`}
              href={item.path}
            >
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
