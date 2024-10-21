"use client";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../../components/Button";
import { IoIosAdd } from "react-icons/io";
import { generateSlug } from "random-word-slugs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useUser } from "@clerk/nextjs";
import { createProjectProps } from "@/app/api/createProject/route";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CreateProjectModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const CreateProjectModal = ({
  showModal,
  setShowModal,
}: CreateProjectModalProps) => {
  const [template, setTemplate] = useState<templateProps>(templates[0]);
  const [title, setTitle] = useState<string>("");

  const { user } = useUser();
  const randomNumber = getRandomNumber(1, 999999999);
  const router = useRouter();

  useEffect(() => {
    const slug = generateSlug(3, { format: "camel" });
    setTitle(slug);
  }, [showModal]);

  const handleSend = async () => {
    if (!user) return;
    const projectId = template.framework + "-" + title + "-" + randomNumber;

    const body: createProjectProps = {
      userId: user.id,
      framework: template.framework,
      title: title,
      projectId: projectId,
    };

    const response = await fetch("/api/createProject", {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(body),
    });

    const data = await response.json();

    const params = new URLSearchParams({
      userId: data.userId,
      projectId: data.projectId,
    });
    router.push(`/project?${params}`);
  };

  return (
    showModal && (
      <div
        onClick={() => setShowModal(false)}
        className="fixed inset-0 w-full z-30 bg-gray-100/60 flex items-start justify-center pb-4"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-[660px] h-[330px] border rounded-xl  mt-20 bg-white flex flex-col items-center justify-start p-4"
        >
          <div className="flex items-center justify-between w-full cursor-pointer border-b pb-1">
            <h1 className="text-sm">Choose a template</h1>
            <div
              onClick={() => setShowModal(false)}
              className="rounded-md hover:bg-gray-100 p-1"
            >
              <RxCross2 />
            </div>
          </div>

          <div className="grid grid-cols-2 w-full h-full rounded-md mt-2 ">
            <div className="flex flex-col h-[260px] items-center justify-start rounded-md">
              <div className="w-full overflow-y-scroll bg-gray-100 flex flex-col items-start justify-start p-2 rounded-lg">
                <h1 className="text-sm">Templates</h1>
                <div className="mt-4 w-full">
                  {templates.map((thisTemplate, index) => {
                    return (
                      <div
                        onClick={() => setTemplate(thisTemplate)}
                        key={index}
                        className={cn(
                          "border border-transparent cursor-pointer p-2 w-full gap-6 hover:border-gray-300 rounded-md flex flex-row items-center justify-start",
                          {
                            "bg-gray-300": thisTemplate === template,
                          }
                        )}
                      >
                        <Image
                          alt={thisTemplate.framework}
                          src={thisTemplate.logo}
                          width={32}
                          height={32}
                        />
                        <div className="flex flex-col">
                          <h1 className="text-sm">{thisTemplate.framework}</h1>
                          <h2 className="text-xs text-gray-400">DevStudio</h2>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-full rounded-lg flex flex-col items-start justify-between pt-4 px-4">
              <Image alt="img" width={42} height={42} src={template.logo} />
              <div className="flex flex-row items-center justify-center gap-2">
                <h1 className="text-base font-medium mt-1">
                  {template.framework}
                </h1>
                <IoIosCheckmarkCircle
                  size={24}
                  fill="#204e7d"
                  className="mt-[4px]"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500/80 line-clamp-3">
                {template.description}
              </p>
              <input
                autoFocus
                onFocus={(e) => e.target.select()}
                spellCheck={false}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg mt-[2px] border p-[2px] px-2 text-sm  outline-none"
              ></input>
              <div className="w-[150px] h-[30px] flex items-center justify-center group ">
                <Button
                  onClick={handleSend}
                  className="gap-1 w-[150px] h-[30px] active:w-[140px] active:h-[28px] rounded-md bg-gradient-to-t z-10 from-[#001f3f] to-[#3b5f85]"
                >
                  <IoIosAdd className="size-[20px] group-active:size-[18px] transition-all duration-100" />
                  <h1 className="text-sm font-medium group-active:text-xs transition-all duration-100">
                    Create project
                  </h1>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateProjectModal;

interface templateProps {
  framework: string;
  logo: string;
  description: string;
}

const templates: templateProps[] = [
  {
    framework: "Node.js",
    logo: "/node.svg",
    description:
      "Build scalable server-side applications with JavaScript.\nPerfect for APIs, microservices, and real-time applications.",
  },
  {
    framework: "Next.js",
    logo: "/next.svg",
    description:
      "React framework for production-grade applications.\nFeatures include SSR, routing, and optimized performance.",
  },
  {
    framework: "Python",
    logo: "/python.svg",
    description:
      "Versatile language for web development, data science, and automation.\nExcellent for beginners with extensive library support.",
  },
  {
    framework: "Vite-React",
    logo: "/vite.svg",
    description:
      "Lightning-fast build tool with React setup.\nOptimized development experience with instant hot module replacement.",
  },
  {
    framework: "Go",
    logo: "/go.svg",
    description:
      "High-performance language for modern backend services.\nExcels in concurrent programming and cloud-native applications.",
  },
  {
    framework: "Empty project",
    logo: "/terminal.svg",
    description:
      "Start from scratch with a clean slate.\nComplete freedom to structure your project as needed.",
  },
];

const getRandomNumber = (min: number, max: number) => {
  const range = max - min + 1;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return min + (randomBuffer[0] % range);
};
