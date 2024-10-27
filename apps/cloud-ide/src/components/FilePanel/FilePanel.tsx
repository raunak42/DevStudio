import { cn } from "@/lib/utils";
import { File, Folder, FolderOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Panel } from "react-resizable-panels";
import { Socket } from "socket.io-client";
import { entity, EntityConponentProps } from "./types";
import { clickDir, getRootContents } from "./helpers";
import { useWatcher } from "./hooks";

export interface FilePanelProps {
  socket: Socket | null;
}

export const FilePanel: React.FC<FilePanelProps> = ({ socket }) => {
  const [allEntities, setAllEntities] = useState<entity[]>([]);

  useEffect(() => {
    getRootContents({ socket, setAllEntities });
  }, [socket]);

  return (
    <Panel className="bg-white">
      <div className="flex flex-col h-full w-full overflow-y-scroll py-6">
        {allEntities.map((entity, index) => {
          return (
            <EntityComponent
              key={index}
              entity={entity}
              depth={0}
              socket={socket}
              allEntities={allEntities}
              setAllEntities={setAllEntities}
            />
          );
        })}
      </div>
    </Panel>
  );
};

const EntityComponent = ({
  entity,
  depth,
  socket,
  allEntities,
  setAllEntities,
}: EntityConponentProps) => {
  const [showOpen, setShowOpen] = useState<boolean>(false);

  useWatcher({ //To handle ui changes if a entities are removed or added from the terminal.
    entity,
    setAllEntities,
    socket,
  });

  const handleClick = () => {
    clickDir({
      entity,
      setAllEntities,
      setShowOpen,
      showOpen,
      socket,
    });
  };

  return (
    <div
      className={cn(
        `${depth === 0 && "ml-[0px]"}`,
        `${depth === 1 && "ml-[36px]"}`,
        `${depth > 1 && "ml-[12px]"}`,

        "border-l border-gray-300"
      )}
    >
      <div
        onClick={handleClick}
        className={cn(
          "py-[4px] shrink-0 cursor-pointer w-full flex flex-row items-center justify-start gap-[6px] hover:bg-gray-200 ",
          `${depth === 0 ? "px-8" : "px-2"}`
        )}
      >
        {entity.type === "dir" ? (
          <>
            {showOpen ? (
              <FolderOpen className="shrink-0 stroke-[1.5px]" size={18} />
            ) : (
              <Folder className="shrink-0 stroke-[1.5px]" size={18} />
            )}
          </>
        ) : (
          <File className="shrink-0 stroke-[1.5px]" size={18} />
        )}
        <h1 className="shrink-0 text-sm select-none">{entity.name}</h1>
      </div>
      {showOpen === true &&
        entity.children?.map((entity, index) => {
          return (
            <EntityComponent
              key={index}
              entity={entity}
              depth={depth + 1}
              socket={socket}
              allEntities={allEntities}
              setAllEntities={setAllEntities}
            />
          );
        })}
    </div>
  );
};
