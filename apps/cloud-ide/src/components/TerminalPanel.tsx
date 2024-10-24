import { Panel } from "react-resizable-panels";
import { WebTerminal } from "./Terminal";
import { Dispatch, RefObject, SetStateAction } from "react";
import { Terminal } from "@/app/(pages)/project/page";
import { cn } from "@/lib/utils";
import { Socket } from "socket.io-client";
import { TerminalTabs } from "./TerminalTabs";

interface TerminalPanelProps {
  scrollContainerRef: RefObject<HTMLDivElement>;
  terminals: Terminal[];
  activeTerminalId: string;
  setActiveTerminalId: Dispatch<SetStateAction<string>>;
  setTerminals: Dispatch<SetStateAction<Terminal[]>>;
  addNewTerminal: () => void;
  socket: Socket | null;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  scrollContainerRef,
  terminals,
  activeTerminalId,
  setActiveTerminalId,
  setTerminals,
  addNewTerminal,
  socket,
}) => {
  return (
    <Panel defaultSize={50}>
      <div className="h-full w-full flex flex-col">
        <TerminalTabs
          activeTerminalId={activeTerminalId}
          addNewTerminal={addNewTerminal}
          scrollContainerRef={scrollContainerRef}
          setActiveTerminalId={setActiveTerminalId}
          setTerminals={setTerminals}
          terminals={terminals}
        />
        <div className="w-full h-full flex flex-col relative">
          {terminals.map((terminal) => {
            return (
              <div
                className={cn(
                  "h-full w-full absolute ",
                  `${terminal.terminalId === activeTerminalId ? "opacity-100" : "opacity-0 pointer-events-none"}`
                )}
                key={terminal.terminalId}
              >
                <WebTerminal
                  socket={socket!}
                  terminalId={terminal.terminalId}
                />
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
};
