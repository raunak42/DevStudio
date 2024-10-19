import {
  BsWindowSidebar,
  BsGithub,
  BsTwitter,
  BsLinkedin,
} from "react-icons/bs";
import { Button } from "./Button";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#001f3f] text-white z-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="flex items-center justify-between">
          {/* Brand Column */}
          <div className="space-y-4 w-[20%]">
            <div className="flex items-center gap-2">
              <BsWindowSidebar size={24} />
              <span className="text-xl font-bold">DevStudio</span>
            </div>
            <p className="text-gray-300 text-sm">
              Build, deploy, and scale your applications with the best cloud
              IDE.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <BsGithub size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <BsTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <BsLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription Column */}
          <div className=" space-y-4 w-[40%]">
            <h3 className="text-lg font-semibold">
              Subscribe to our Newsletter
            </h3>
            <p className="text-gray-300 text-sm">
              Stay updated with our latest features and releases.
            </p>
            <form className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
                  required
                />
                <div className="w-[200px] flex items-center justify-center">
                  <Button
                    type="submit"
                    className="w-[200px] active:w-[180px] px-6 py-2 bg-gradient-to-r from-yellow-400 to-pink-500 text-white hover:bg-blue-700 transition-colors font-bold"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} DevStudio. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-300">
              <span className="bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text">
                Made with ❤️ by raunak42
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
