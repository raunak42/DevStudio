import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[90vh] w-screen flex items-start justify-center overflow-x-clip mt-12">
      <SignIn fallbackRedirectUrl={"/dashboard"} />
    </div>
  );
}
