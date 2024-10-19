import { code } from "@/lib/constants";
import HeroCode from "../components/HeroCode";
import Image from "next/image";
import { Button } from "../components/Button";
import { FiCloud, FiZap } from "react-icons/fi";
import { BsTerminal, BsWindow } from "react-icons/bs";
import { VscSymbolMethod } from "react-icons/vsc";
import { BiTimer } from "react-icons/bi";


export default function Home() {
  return (
    <div className="relative w-full flex flex-col items-center justify-start overflow-x-clip">
      {/* Hero Section (Existing) */}
      <div className="flex flex-col items-center justify-start gap-4">
        <div className="absolute h-screen w-screen flex items-start justify-center z-0">
          <Image
            alt="img"
            src={"/backgrounds/blob.svg"}
            width={1000}
            height={1000}
            className="bg-black"
          />
        </div>
        <h1 className="text-7xl font-bold text-center mt-12 w-[80%] z-10 text-[#001f3f]">
          Build your most ambitious projects with{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
            DevStudio
          </span>
        </h1>
        <h2 className="text-xl text-gray-400 z-10">
          A powerful{" "}
          <span className="text-gray-600 font-semibold bg-gradient-to-l from-orange-400 to-pink-500 text-transparent bg-clip-text">
            Cloud IDE
          </span>{" "}
          that turns your ideas into reality, anywhere, anytime
        </h2>
        <div className="h-[60px] z-10 flex items-center justify-center">
          <Button className="bg-gradient-to-t z-10 from-[#001f3f] to-[#3b5f85] w-[200px] active:w-[180px] font-semibold">
            Get Started
          </Button>
        </div>
        <HeroCode fileName="index.js" code={code} className="z-10" />
      </div>

      {/* Features Section */}
      <section className="w-full py-24 bg-transparent z-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#001f3f] mb-4">
            Everything you need to code
            <span className="bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
              {" "}
              brilliantly
            </span>
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            DevStudio combines powerful development tools with an intuitive
            interface, making coding more productive and enjoyable than ever
            before.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <VscSymbolMethod size={24} />,
                title: "Monaco-Powered Editor",
                description: "Built on the same editor that powers VS Code, with syntax highlighting for 50+ languages"
              },
              {
                icon: <FiCloud size={24} />,
                title: "Cloud Development",
                description:
                  "Code from anywhere with automatic syncing and backup of your workspace",
              },
              {
                icon: <FiZap size={24} />,
                title: "Convenient Shortcuts",
                description: "Standard keyboard shortcuts and commands to help you code efficiently"
              },
              {
                icon: <BiTimer size={24} />,
                title: "Lightning Fast",
                description:
                  "Optimized performance with minimal latency for a native-like experience",
              },
              {
                icon: <BsTerminal size={24} />,
                title: "Integrated Terminal",
                description:
                  "Full-featured terminal with support for custom shells and commands",
              },
              {
                icon: <BsWindow size={24} />,
                title: "Customizable Workspace",
                description:
                  "Personalize your development environment with themes and extensions",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-gray-200 hover:border-orange-400 transition-all hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#001f3f] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
<section className="w-full py-24 bg-gray-50 z-10">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-4xl font-bold text-center text-[#001f3f] mb-4">
      Loved by developers
      <span className="bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
        {" "}worldwide
      </span>
    </h2>
    <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
      Join thousands of developers who have transformed their workflow with DevStudio
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          name: "Sarah Chen",
          role: "Senior Frontend Developer",
          company: "TechCorp",
          image: "http://www.avatarsinpixels.com/minipix/eyJCYWNrZ3JvdW5kIjoiMSIsIkhhaXJMb3dlciI6IjkiLCJFeWVzIjoiNiIsIk1vdXRoIjoiOCIsIlNvY2tzIjoiMTQiLCJTaG9lcyI6IjQiLCJHbG92ZXMiOiI2IiwiVG9wIjoiMTYiLCJIYWlyIjoiMjUiLCJleWVzVG9uZSI6ImMyYjliMSIsImV5ZXNUb25lMiI6ImVlNDQ3MyIsIm1hc2tUb25lIjoiMmJlYWIyIiwiaGFpclRvbmUiOiIxNDJmMzQiLCJoYWlyVG9uZTIiOiJlMzgwZDkiLCJ1bmRlcndlYXJUb25lIjoiZjRmZjljIiwidW5kZXJ3ZWFyVG9uZTIiOiJiNTUwYjciLCJwYW50c1RvbmUiOiIxNzI1NjgiLCJwYW50c1RvbmUyIjoiMWJmYzY1IiwidG9wVG9uZSI6ImZlNDI5MSIsInRvcFRvbmUyIjoiNzVjMjA0Iiwid2luZ3NUb25lIjoiMWE3NTBkIiwid2luZ3NUb25lMiI6ImNhNGQ2ZiIsInNob2VzVG9uZSI6IjA1M2JjMiIsInNvY2tzVG9uZSI6ImJkYTUzNCIsInNvY2tzVG9uZTIiOiI1YmIzYTciLCJnbG92ZXNUb25lIjoiYjQ0MDZlIiwiZ2xvdmVzVG9uZTIiOiIwNzcwOGEiLCJoYXRUb25lIjoiODg5NTIwIiwiaGF0VG9uZTIiOiIwY2IzMzQiLCJjYXBlVG9uZSI6Ijc4MTViMiIsImNhcGVUb25lMiI6ImVkYTdiMCIsImJlbHRUb25lIjoiYWQ3MmQzIiwiamFja2V0VG9uZSI6Ijg2NTlhMiIsImphY2tldFRvbmUyIjoiZWQzZDRlIiwibmVja1RvbmUiOiIwZGU5NTEiLCJuZWNrVG9uZTIiOiI2MzJlMzkifQ==/1/show.png",
          quote: "DevStudio has completely transformed how I work. The cloud-based environment means I can code from anywhere, and the AI suggestions have boosted my productivity tremendously.",
          rating: 5
        },
        {
          name: "Michael Rodriguez",
          role: "Full Stack Developer",
          company: "StartupHub",
          image: "http://www.avatarsinpixels.com/minipix/eyJCYWNrZ3JvdW5kIjoiNiIsIkhhaXJMb3dlciI6IjExIiwiQm9keSI6IjEiLCJFeWVzIjoiMTAiLCJTaG9lcyI6IjMiLCJQYW50cyI6IjUiLCJUb3AiOiI3IiwiSGFpciI6IjE1IiwiZXllc1RvbmUiOiJjMmI5YjEiLCJleWVzVG9uZTIiOiJlZTQ0NzMiLCJtYXNrVG9uZSI6IjJiZWFiMiIsImhhaXJUb25lIjoiMTQyZjM0IiwiaGFpclRvbmUyIjoiZTM4MGQ5IiwidW5kZXJ3ZWFyVG9uZSI6ImY0ZmY5YyIsInVuZGVyd2VhclRvbmUyIjoiYjU1MGI3IiwicGFudHNUb25lIjoiMTcyNTY4IiwicGFudHNUb25lMiI6IjFiZmM2NSIsInRvcFRvbmUiOiJmZTQyOTEiLCJ0b3BUb25lMiI6Ijc1YzIwNCIsIndpbmdzVG9uZSI6IjFhNzUwZCIsIndpbmdzVG9uZTIiOiJjYTRkNmYiLCJzaG9lc1RvbmUiOiIwNTNiYzIiLCJzb2Nrc1RvbmUiOiJiZGE1MzQiLCJzb2Nrc1RvbmUyIjoiNWJiM2E3IiwiZ2xvdmVzVG9uZSI6ImI0NDA2ZSIsImdsb3Zlc1RvbmUyIjoiMDc3MDhhIiwiaGF0VG9uZSI6Ijg4OTUyMCIsImhhdFRvbmUyIjoiMGNiMzM0IiwiY2FwZVRvbmUiOiI3ODE1YjIiLCJjYXBlVG9uZTIiOiJlZGE3YjAiLCJiZWx0VG9uZSI6ImFkNzJkMyIsImphY2tldFRvbmUiOiI4NjU5YTIiLCJqYWNrZXRUb25lMiI6ImVkM2Q0ZSIsIm5lY2tUb25lIjoiMGRlOTUxIiwibmVja1RvbmUyIjoiNjMyZTM5In0=/1/show.png",
          quote: "The integrated terminal and Git features are game-changers. I can manage my entire development workflow without switching between different tools.",
          rating: 5
        },
        {
          name: "Emily Taylor",
          role: "Software Engineer",
          company: "InnovateLabs",
          image: "http://www.avatarsinpixels.com/minipix/eyJCYWNrZ3JvdW5kIjoiMyIsIkhhaXJMb3dlciI6IjEwIiwiRXllcyI6IjEwIiwiTW91dGgiOiI2IiwiU29ja3MiOiI5IiwiU2hvZXMiOiI1IiwiR2xvdmVzIjoiMSIsIlBhbnRzIjoiMSIsIlRvcCI6IjkiLCJIYWlyIjoiMTAiLCJleWVzVG9uZSI6ImMyYjliMSIsImV5ZXNUb25lMiI6ImVlNDQ3MyIsIm1hc2tUb25lIjoiMmJlYWIyIiwiaGFpclRvbmUiOiIxNDJmMzQiLCJoYWlyVG9uZTIiOiJlMzgwZDkiLCJ1bmRlcndlYXJUb25lIjoiZjRmZjljIiwidW5kZXJ3ZWFyVG9uZTIiOiJiNTUwYjciLCJwYW50c1RvbmUiOiIxNzI1NjgiLCJwYW50c1RvbmUyIjoiMWJmYzY1IiwidG9wVG9uZSI6ImZlNDI5MSIsInRvcFRvbmUyIjoiNzVjMjA0Iiwid2luZ3NUb25lIjoiMWE3NTBkIiwid2luZ3NUb25lMiI6ImNhNGQ2ZiIsInNob2VzVG9uZSI6IjA1M2JjMiIsInNvY2tzVG9uZSI6ImJkYTUzNCIsInNvY2tzVG9uZTIiOiI1YmIzYTciLCJnbG92ZXNUb25lIjoiYjQ0MDZlIiwiZ2xvdmVzVG9uZTIiOiIwNzcwOGEiLCJoYXRUb25lIjoiODg5NTIwIiwiaGF0VG9uZTIiOiIwY2IzMzQiLCJjYXBlVG9uZSI6Ijc4MTViMiIsImNhcGVUb25lMiI6ImVkYTdiMCIsImJlbHRUb25lIjoiYWQ3MmQzIiwiamFja2V0VG9uZSI6Ijg2NTlhMiIsImphY2tldFRvbmUyIjoiZWQzZDRlIiwibmVja1RvbmUiOiIwZGU5NTEiLCJuZWNrVG9uZTIiOiI2MzJlMzkifQ==/1/show.png",
          quote: "As someone who works with distributed teams, DevStudio's collaborative features have made code reviews and pair programming seamless.",
          rating: 5
        }
      ].map((testimonial, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-lg border border-gray-200 hover:border-orange-400 transition-all hover:shadow-lg"
        >
          <div className="flex items-start gap-4 mb-6">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-[#001f3f]">{testimonial.name}</h3>
              <p className="text-gray-600 text-sm">{testimonial.role}</p>
              <p className="text-orange-400 text-sm">{testimonial.company}</p>
            </div>
          </div>
          
          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            ))}
          </div>

          <blockquote className="text-gray-600 leading-relaxed">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
        </div>
      ))}
    </div>

    {/* Social Proof Stats */}
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
      {[
        { number: "10K+", label: "Active Users" },
        { number: "50M+", label: "Lines of Code Written" },
        { number: "99.9%", label: "Uptime" },
        { number: "4.9/5", label: "Average Rating" }
      ].map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
            {stat.number}
          </div>
          <div className="text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>

    {/* Call to Action */}
    <div className="mt-16 text-center">
      <Button className="bg-[#001f3f] text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all">
        Join Our Community
      </Button>
    </div>
  </div>
</section>
      
    </div>
  );
}