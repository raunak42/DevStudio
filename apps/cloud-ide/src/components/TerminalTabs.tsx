import { Terminal } from "@/app/(pages)/project/page";
import { cn } from "@/lib/utils";
import { CloseTermState } from "@/store";
import { Dispatch, MouseEvent, RefObject, SetStateAction } from "react";
import { IoAddSharp } from "react-icons/io5";
import { PiTerminalWindowLight } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import { useSetRecoilState } from "recoil";

interface TerminalTabsProps {
  scrollContainerRef: RefObject<HTMLDivElement>;
  terminals: Terminal[];
  activeTerminalId: string;
  setActiveTerminalId: Dispatch<SetStateAction<string>>;
  setTerminals: Dispatch<SetStateAction<Terminal[]>>;
  addNewTerminal: () => void;
}

export const TerminalTabs: React.FC<TerminalTabsProps> = ({
  scrollContainerRef,
  activeTerminalId,
  addNewTerminal,
  setActiveTerminalId,
  setTerminals,
  terminals,
}) => {
  const setCloseTerm = useSetRecoilState(CloseTermState);

  const closeNodePty = async (terminal: Terminal) => {
    await new Promise<void>((resolve) => {
      setCloseTerm({
        terminalId: terminal.terminalId,
        close: true,
      });
      resolve();
    });
  };

  const handleClose = async (e: MouseEvent, terminal: Terminal) => {
    e.stopPropagation();
    await closeNodePty(terminal);
    const newTerminals = terminals.filter(
      (t) => t.terminalId !== terminal.terminalId
    );
    setTerminals(newTerminals);
    if (activeTerminalId === terminal.terminalId) {
      if (newTerminals.length > 0) {
        setActiveTerminalId(newTerminals[newTerminals.length - 1].terminalId);
      }
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="w-full h-[36px] flex flex-row items-center justify-start overflow-x-scroll custom-scrollbar transition-all duration-300"
    >
      {terminals.map((terminal, index) => {
        return (
          <div
            onClick={() => setActiveTerminalId(terminal.terminalId)}
            key={index}
            className={cn(
              "cursor-pointer h-full w-[120px] flex-shrink-0 flex items-center justify-between px-2 ",
              `${terminal.terminalId === activeTerminalId ? "border-r  border-t border-t-blue-500 border-b border-b-white" : "border-b border-r border-t border-t-gray-200 hover:bg-gray-100"}`
            )}
          >
            <div className="gap-[8px] flex flex-row items-center justify-start">
              <PiTerminalWindowLight size={20} />
              <h1 className="text-xs font-normal  text-black">Shell</h1>
            </div>
            <button
              onClick={(e) => handleClose(e, terminal)}
              className="hover:bg-gray-200 rounded-sm p-1"
            >
              <RxCross1 size={8} />
            </button>
          </div>
        );
      })}
      <div className="h-full w-full border-b flex items-center justify-start">
        <div
          onClick={addNewTerminal}
          className="cursor-pointer h-full flex-shrink-0  w-[32px]  flex items-center justify-center rounded-sm hover:bg-gray-100   "
        >
          <IoAddSharp size={16} strokeWidth={0.1} />
        </div>
      </div>
    </div>
  );
};
