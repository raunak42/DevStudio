import { BiTimer } from "react-icons/bi";
import { BsTerminal, BsWindow } from "react-icons/bs";
import { FiCloud, FiZap } from "react-icons/fi";
import { VscSymbolMethod } from "react-icons/vsc";

export function Features() {
  return (
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
              description:
                "Built on the same editor that powers VS Code, with syntax highlighting for 50+ languages",
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
              description:
                "Standard keyboard shortcuts and commands to help you code efficiently",
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
  );
}
