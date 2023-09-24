// app/page.tsx
"use client";
import { useExploreProfiles } from "@lens-protocol/react-web";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");

  const { data } = useExploreProfiles({
    limit: 25,
  });

  return (
    <div className="p-20">
      <h1 className="text-5xl">My Lens App</h1>
      <div className="my-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search a lens profile"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            required
          />
        </div>
        {searchInput !== "" && (
          <div className="py-4 bg-zinc-900 rounded mb-3 px-4">
            <Link href={`/profile/${searchInput}.lens`}>
              Search for {searchInput} profile
            </Link>
          </div>
        )}
      </div>
      {data?.map((profile, index) => (
        <Link href={`/profile/${profile.handle}`} key={index}>
          <div className="my-14">
            {profile.picture && profile.picture.__typename === "MediaSet" ? (
              <img
                src={profile.picture.original.url}
                width="120"
                height="120"
                alt={profile.handle}
              />
            ) : (
              <div className="w-14 h-14 bg-slate-500	" />
            )}
            <h3 className="text-3xl my-4">{profile.handle}</h3>
            <p className="text-xl">{profile.bio}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
