// app/page.tsx
"use client";
import { Button } from "../components/Button";

export default function Home() {
  async function handleClick() {
    const response = await fetch("/api/hello", {
      method: "GET",
      cache: "no-store",
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <div className="h-screen w-screen bg-[#f1e5c3] flex items-center justify-center">
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
