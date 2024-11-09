"use client";
import { Socket } from "socket.io-client";
import { useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { HiOutlineMinus } from "react-icons/hi2";
import { TerminalPanel } from "@/components/TerminalPanel";
import { CodePanel } from "@/components/CodePanel/CodePanel";
import { WebViewPanel } from "@/components/WebViewPanel";
import { FilePanel } from "@/components/FilePanel/FilePanel";
import Loading from "./loading";
import { useRecoilValue } from "recoil";
import { HomeClickedState } from "@/store";
import { entity } from "@/components/FilePanel/types";
import {
  useDisconnectViaButton,
  useFixScroll,
  useLoadedEvent,
  useSocket,
} from "./hooks";
import { getRandomNumber } from "./helpers";

export interface Terminal {
  terminalId: string;
}

export default function Page() {
  const homeButtonClicked = useRecoilValue(HomeClickedState);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [activeTerminalId, setActiveTerminalId] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<entity[] | null>();

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

  useSocket({ projectId, setSocket, userId });
  useLoadedEvent({ addNewTerminal, setFiles, socket });
  useFixScroll({ scrollContainerRef, terminals });
  useDisconnectViaButton({ socket, homeButtonClicked });

  if (!files) {
    return <Loading />;
  }

  return (
    <div className="h-screen-minus-nav">
      <PanelGroup direction="horizontal">
        <FilePanel rootContent={files} socket={socket} />
        <PanelResizeHandle className="group flex flex-col items-center justify-center  group  w-[4px] bg-gray-200">
          <HiOutlineMinus
            className="stroke-[1px] text-gray-400 group-hover:text-gray-800 rotate-90"
            size={40}
          />
        </PanelResizeHandle>
        <CodePanel socket={socket} />
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
