"use client";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const userId = params.get("userId");
  const projectId = params.get("projectId");

  return (
    <div className="p-32 text-black">
      <h1>userId: {userId}</h1>
      <h1>projectId: {projectId}</h1>
    </div>
  );
}
