"use client";
import { Testimonials } from "../../components/Testimonials";
import { Features } from "../../components/Features";
import { Hero } from "../../components/Hero";
import { useRecoilState } from "recoil";
import { ScrollToState } from "@/store";
import { useEffect, useRef } from "react";
import Footer from "../../components/Footer";

export default function Home() {
  const featuresRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const [scrollTo, setScrollTo] = useRecoilState(ScrollToState);

  useEffect(() => {
    if (featuresRef.current && testimonialsRef.current && scrollTo.clicked) {
      const scrollToSection = async () => {
        try {
          if (scrollTo.section === "features") {
            await featuresRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          } else if (scrollTo.section === "testimonials") {
            await testimonialsRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          // Reset scroll state after animation completes
          setScrollTo({ clicked: false, section: "" });
        } catch (error) {
          console.error("Error scrolling:", error);
        }
      };

      scrollToSection();
    }
  }, [scrollTo, setScrollTo]);

  return (
    <div className="relative w-full flex flex-col items-center justify-start overflow-x-clip">
      <Hero />
      <Features ref={featuresRef} />
      <Testimonials ref={testimonialsRef} />
      <Footer />
    </div>
  );
}
