"use client";
import { io, Socket } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { HiOutlineMinus } from "react-icons/hi2";
import { PiSpinnerLight } from "react-icons/pi";
import { TerminalPanel } from "@/components/TerminalPanel";
import { CodePanel } from "@/components/CodePanel";
import { WebViewPanel } from "@/components/WebViewPanel";
import { FilePanel } from "@/components/FilePanel/FilePanel";

export interface Terminal {
  terminalId: string;
}

export default function Page() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [activeTerminalId, setActiveTerminalId] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [filesLoaded,setFilesLoaded] = useState<boolean>(false)
  
  const params = useSearchParams();
  const userId = params.get("userId");
  const projectId = params.get("projectId");

  const addNewTerminal = useCallback(() => {
    if (!socket) return;
    const randomNumber = getRandomNumber(1, 999999999);
    const terminalId = `${userId}-${randomNumber}`;

    const newTerminal: Terminal = {
      terminalId: terminalId,
    };

    setTerminals((prev) => [...prev, newTerminal]);
    setActiveTerminalId(terminalId);
  }, [socket, userId]);

  useEffect(() => {
    const newSocket = io(
      `${API_BASE_URL}?userId=${userId}&projectId=${projectId}`
    );
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [projectId, userId]);

  useEffect(() => {
    if (!socket) return;
    socket.on("files-loaded", (data) => {
      if (data.loaded === true) {
        setFilesLoaded(true)
        addNewTerminal();
      }
    });
  }, [socket, addNewTerminal]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  });

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [terminals]);

  if (!filesLoaded) {
    return (
      <div className="h-screen-minus-nav w-screen flex flex-col items-center justify-start mt-64 gap-2">
        <PiSpinnerLight
          size={56}
          strokeWidth={0.5}
          className="animate-spin text-gray-600"
        />
      </div>
    );
  }

  return (
    <div className="h-screen-minus-nav">
      <PanelGroup direction="horizontal">
        <FilePanel socket={socket}/>
        <PanelResizeHandle className="group flex flex-col items-center justify-center  group  w-[4px] bg-gray-200">
          <HiOutlineMinus
            className="stroke-[1px] text-gray-400 group-hover:text-gray-800 rotate-90"
            size={40}
          />
        </PanelResizeHandle>
        <CodePanel />
        <PanelResizeHandle className="group flex flex-col items-center justify-center  group  w-[4px] bg-gray-200">
          <HiOutlineMinus
            className="stroke-[1px] text-gray-400 group-hover:text-gray-800 rotate-90"
            size={40}
          />
        </PanelResizeHandle>
        <Panel className="" defaultSize={36}>
          <PanelGroup direction="vertical">
            <WebViewPanel />
            <PanelResizeHandle className="group flex flex-row items-center justify-center  group h-[4px]  bg-gray-200">
              <HiOutlineMinus
                className="stroke-[1px] text-gray-400 group-hover:text-gray-800 "
                size={40}
              />
            </PanelResizeHandle>
            <TerminalPanel
              activeTerminalId={activeTerminalId}
              addNewTerminal={addNewTerminal}
              scrollContainerRef={scrollContainerRef}
              setActiveTerminalId={setActiveTerminalId}
              setTerminals={setTerminals}
              socket={socket}
              terminals={terminals}
            />
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}

const getRandomNumber = (min: number, max: number) => {
  const range = max - min + 1;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return min + (randomBuffer[0] % range);
};
