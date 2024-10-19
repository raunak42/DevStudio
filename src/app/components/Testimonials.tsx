import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TestimonialsProps extends HTMLAttributes<HTMLElement> {}

export const Testimonials = forwardRef<HTMLElement, TestimonialsProps>(
  ({className, ...props}, ref) => {
    return (
      <section {...props} ref={ref} className={cn("w-full py-24 z-10",className)}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#001f3f] mb-4">
            Loved by developers
            <span className="bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
              {" "}
              worldwide
            </span>
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto">
            Join thousands of developers who have transformed their workflow
            with DevStudio
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Senior Frontend Developer",
                company: "TechCorp",
                image:
                  "http://www.avatarsinpixels.com/minipix/eyJCYWNrZ3JvdW5kIjoiMSIsIkhhaXJMb3dlciI6IjkiLCJFeWVzIjoiNiIsIk1vdXRoIjoiOCIsIlNvY2tzIjoiMTQiLCJTaG9lcyI6IjQiLCJHbG92ZXMiOiI2IiwiVG9wIjoiMTYiLCJIYWlyIjoiMjUiLCJleWVzVG9uZSI6ImMyYjliMSIsImV5ZXNUb25lMiI6ImVlNDQ3MyIsIm1hc2tUb25lIjoiMmJlYWIyIiwiaGFpclRvbmUiOiIxNDJmMzQiLCJoYWlyVG9uZTIiOiJlMzgwZDkiLCJ1bmRlcndlYXJUb25lIjoiZjRmZjljIiwidW5kZXJ3ZWFyVG9uZTIiOiJiNTUwYjciLCJwYW50c1RvbmUiOiIxNzI1NjgiLCJwYW50c1RvbmUyIjoiMWJmYzY1IiwidG9wVG9uZSI6ImZlNDI5MSIsInRvcFRvbmUyIjoiNzVjMjA0Iiwid2luZ3NUb25lIjoiMWE3NTBkIiwid2luZ3NUb25lMiI6ImNhNGQ2ZiIsInNob2VzVG9uZSI6IjA1M2JjMiIsInNvY2tzVG9uZSI6ImJkYTUzNCIsInNvY2tzVG9uZTIiOiI1YmIzYTciLCJnbG92ZXNUb25lIjoiYjQ0MDZlIiwiZ2xvdmVzVG9uZTIiOiIwNzcwOGEiLCJoYXRUb25lIjoiODg5NTIwIiwiaGF0VG9uZTIiOiIwY2IzMzQiLCJjYXBlVG9uZSI6Ijc4MTViMiIsImNhcGVUb25lMiI6ImVkYTdiMCIsImJlbHRUb25lIjoiYWQ3MmQzIiwiamFja2V0VG9uZSI6Ijg2NTlhMiIsImphY2tldFRvbmUyIjoiZWQzZDRlIiwibmVja1RvbmUiOiIwZGU5NTEiLCJuZWNrVG9uZTIiOiI2MzJlMzkifQ==/1/show.png",
                quote:
                  "DevStudio has completely transformed how I work. The cloud-based environment means I can code from anywhere, and the AI suggestions have boosted my productivity tremendously.",
                rating: 5,
              },
              {
                name: "Michael Rodriguez",
                role: "Full Stack Developer",
                company: "StartupHub",
                image:
                  "http://www.avatarsinpixels.com/minipix/eyJCYWNrZ3JvdW5kIjoiNiIsIkhhaXJMb3dlciI6IjExIiwiQm9keSI6IjEiLCJFeWVzIjoiMTAiLCJTaG9lcyI6IjMiLCJQYW50cyI6IjUiLCJUb3AiOiI3IiwiSGFpciI6IjE1IiwiZXllc1RvbmUiOiJjMmI5YjEiLCJleWVzVG9uZTIiOiJlZTQ0NzMiLCJtYXNrVG9uZSI6IjJiZWFiMiIsImhhaXJUb25lIjoiMTQyZjM0IiwiaGFpclRvbmUyIjoiZTM4MGQ5IiwidW5kZXJ3ZWFyVG9uZSI6ImY0ZmY5YyIsInVuZGVyd2VhclRvbmUyIjoiYjU1MGI3IiwicGFudHNUb25lIjoiMTcyNTY4IiwicGFudHNUb25lMiI6IjFiZmM2NSIsInRvcFRvbmUiOiJmZTQyOTEiLCJ0b3BUb25lMiI6Ijc1YzIwNCIsIndpbmdzVG9uZSI6IjFhNzUwZCIsIndpbmdzVG9uZTIiOiJjYTRkNmYiLCJzaG9lc1RvbmUiOiIwNTNiYzIiLCJzb2Nrc1RvbmUiOiJiZGE1MzQiLCJzb2Nrc1RvbmUyIjoiNWJiM2E3IiwiZ2xvdmVzVG9uZSI6ImI0NDA2ZSIsImdsb3Zlc1RvbmUyIjoiMDc3MDhhIiwiaGF0VG9uZSI6Ijg4OTUyMCIsImhhdFRvbmUyIjoiMGNiMzM0IiwiY2FwZVRvbmUiOiI3ODE1YjIiLCJjYXBlVG9uZTIiOiJlZGE3YjAiLCJiZWx0VG9uZSI6ImFkNzJkMyIsImphY2tldFRvbmUiOiI4NjU5YTIiLCJqYWNrZXRUb25lMiI6ImVkM2Q0ZSIsIm5lY2tUb25lIjoiMGRlOTUxIiwibmVja1RvbmUyIjoiNjMyZTM5In0=/1/show.png",
                quote:
                  "The integrated terminal and Git features are game-changers. I can manage my entire development workflow without switching between different tools.",
                rating: 5,
              },
              {
                name: "Emily Taylor",
                role: "Software Engineer",
                company: "InnovateLabs",
                image:
                  "http://www.avatarsinpixels.com/minipix/eyJCYWNrZ3JvdW5kIjoiMyIsIkhhaXJMb3dlciI6IjEwIiwiRXllcyI6IjEwIiwiTW91dGgiOiI2IiwiU29ja3MiOiI5IiwiU2hvZXMiOiI1IiwiR2xvdmVzIjoiMSIsIlBhbnRzIjoiMSIsIlRvcCI6IjkiLCJIYWlyIjoiMTAiLCJleWVzVG9uZSI6ImMyYjliMSIsImV5ZXNUb25lMiI6ImVlNDQ3MyIsIm1hc2tUb25lIjoiMmJlYWIyIiwiaGFpclRvbmUiOiIxNDJmMzQiLCJoYWlyVG9uZTIiOiJlMzgwZDkiLCJ1bmRlcndlYXJUb25lIjoiZjRmZjljIiwidW5kZXJ3ZWFyVG9uZTIiOiJiNTUwYjciLCJwYW50c1RvbmUiOiIxNzI1NjgiLCJwYW50c1RvbmUyIjoiMWJmYzY1IiwidG9wVG9uZSI6ImZlNDI5MSIsInRvcFRvbmUyIjoiNzVjMjA0Iiwid2luZ3NUb25lIjoiMWE3NTBkIiwid2luZ3NUb25lMiI6ImNhNGQ2ZiIsInNob2VzVG9uZSI6IjA1M2JjMiIsInNvY2tzVG9uZSI6ImJkYTUzNCIsInNvY2tzVG9uZTIiOiI1YmIzYTciLCJnbG92ZXNUb25lIjoiYjQ0MDZlIiwiZ2xvdmVzVG9uZTIiOiIwNzcwOGEiLCJoYXRUb25lIjoiODg5NTIwIiwiaGF0VG9uZTIiOiIwY2IzMzQiLCJjYXBlVG9uZSI6Ijc4MTViMiIsImNhcGVUb25lMiI6ImVkYTdiMCIsImJlbHRUb25lIjoiYWQ3MmQzIiwiamFja2V0VG9uZSI6Ijg2NTlhMiIsImphY2tldFRvbmUyIjoiZWQzZDRlIiwibmVja1RvbmUiOiIwZGU5NTEiLCJuZWNrVG9uZTIiOiI2MzJlMzkifQ==/1/show.png",
                quote:
                  "As someone who works with distributed teams, DevStudio's collaborative features have made code reviews and pair programming seamless.",
                rating: 5,
              },
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
                    <h3 className="font-semibold text-[#001f3f]">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-orange-400 text-sm">
                      {testimonial.company}
                    </p>
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
              { number: "4.9/5", label: "Average Rating" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
)

Testimonials.displayName = "Testimonials";