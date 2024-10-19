import { Testimonials } from "../components/Testimonials";
import { Features } from "../components/Features";
import { Hero } from "../components/Hero";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col items-center justify-start overflow-x-clip">
      <Hero />
      <Features />
      <Testimonials />
    </div>
  );
}
