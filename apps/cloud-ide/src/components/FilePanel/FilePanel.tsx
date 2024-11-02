import { FilePlus, FolderPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Panel } from "react-resizable-panels";
import { Socket } from "socket.io-client";
import { entity } from "./types";
import { getRootContents } from "./helpers";
import { Entity } from "./Entity";

export interface FilePanelProps {
  socket: Socket | null;
}

export const FilePanel: React.FC<FilePanelProps> = ({ socket }) => {
  const [allEntities, setAllEntities] = useState<entity[]>([]);
  const [openFolders, setOpenFolders] = useState<string[]>([]);

  const [newEntityName, setNewEntityName] = useState<string>("");
  const [showInput, setShowInput] = useState<{
    show: boolean;
    inputFor: "dir" | "file" | "";
  }>({
    show: false,
    inputFor: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getRootContents({ socket, setAllEntities });
  }, [socket]);

  const handleSend = () => {
    if (!socket || !showInput.inputFor || !showInput.show) return;
    if (showInput.inputFor === "dir") {
      socket.emit("addFolder", { folderName: newEntityName, atRoot: true });
      setShowInput({ show: false, inputFor: "dir" });
    } else if (showInput.inputFor === "file") {
      socket.emit("addFile", { fileName: newEntityName, atRoot: true });
      setShowInput({ show: false, inputFor: "dir" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowInput({
          inputFor: "",
          show: false,
        });
      }
    };

    if (showInput.show === true) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showInput.show]);

  return (
    <Panel
      minSize={12}
      className="bg-white flex flex-col items-center justify-start"
    >
      <div className="w-full flex items-center justify-between px-6 mt-4">
        <h1 className="text-sm font-medium text-gray-800">Files</h1>
        <div className="flex items-center justify-center gap-2 h-[32px]">
          <div className="hover:bg-gray-100 cursor-pointer rounded-lg p-[6px]">
            <FilePlus
              onClick={() => {
                setShowInput({
                  show: true,
                  inputFor: "file",
                });
              }}
              size={17}
              className="stroke-[1.4px] text-gray-700"
            />
          </div>
          <div className="hover:bg-gray-100 cursor-pointer rounded-lg p-[6px] mt-[2px]">
            <FolderPlus
              onClick={() => {
                setShowInput({
                  show: true,
                  inputFor: "dir",
                });
              }}
              size={17}
              className="stroke-[1.4px] text-gray-700 "
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full w-full overflow-y-scroll pl-4 mt-2">
        {allEntities.map((entity, index) => {
          return (
            <Entity
              key={index}
              entity={entity}
              depth={0}
              socket={socket}
              allEntities={allEntities}
              setAllEntities={setAllEntities}
              openFolders={openFolders}
              setOpenFolders={setOpenFolders}
            />
          );
        })}
        {showInput.show && (
          <input
            ref={inputRef}
            autoFocus
            onChange={(e) => {
              setNewEntityName(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            className="w-[90%] h-[28px] outline-none rounded-md border-[1.5px] px-[10px] text-sm mt-[4px] focus-within:border-green-400"
          ></input>
        )}
      </div>
    </Panel>
  );
};
