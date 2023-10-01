"use client";

import Search from "@/components/Search";
import Image from "next/image";
export default function Home() {
  return (
    <main className="wrapper">
      <div className="container">
        <Image
          src="https://i.imgur.com/4QMunse.png"
          alt="champ"
          width={350}
          height={277}
        />
        <Search />
      </div>
    </main>
  );
}
