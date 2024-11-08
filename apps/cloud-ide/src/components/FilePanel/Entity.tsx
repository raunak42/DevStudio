import { cn } from "@/lib/utils";
import { handleDirClick, handleFileClick } from "./helpers";
import { useWatcher } from "./hooks";
import { EntityConponentProps } from "./types";
import { Folder, FolderOpen } from "lucide-react";
import { FileIcon } from "./FileIcons";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";
import { EntityMenu } from "./EntityMenu";
import { useSetRecoilState } from "recoil";
import { fileState } from "@/store";

export const Entity: React.FC<EntityConponentProps> = ({
  entity,
  depth,
  socket,
  allEntities,
  setAllEntities,
  openFolders,
  setOpenFolders,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setFile = useSetRecoilState(fileState);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useWatcher({
    entity,
    setAllEntities,
    socket,
    openFolders,
    setOpenFolders,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside both the menu and the trigger button
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener when menu is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (e.type === "contextmenu") {
      setIsMenuOpen((prev) => !prev);
    } else if (entity.type === "dir") {
      handleDirClick({
        entity,
        setAllEntities,
        socket,
        openFolders,
        setOpenFolders,
      });
    } else if (entity.type === "file") {
      handleFileClick({ entity, socket, setFile });
    }
  };

  const isOpen = openFolders.includes(entity.path);

  return (
    <div
      className={cn(
        `${depth === 0 && "ml-[0px]"}`,
        `${depth === 1 && "ml-[12px] border-l border-gray-300"}`,
        `${depth > 1 && "ml-[12px] border-l border-gray-300"}`,
        ""
      )}
    >
      <div
        onClick={(e) => handleClick(e as unknown as MouseEvent)}
        onContextMenu={(e) => handleClick(e as unknown as MouseEvent)}
        className={cn(
          "relative group h-[28px] shrink-0 cursor-pointer w-full flex flex-row items-center justify-between hover:bg-[#86EFAC25] rounded-md pl-2"
        )}
        title={entity.name}
      >
        <div className="flex items-center justify-start gap-[6px] shrink-0 flex-1 min-w-0 z-0">
          <div className="w-[18px] flex-shrink-0">
            {entity.type === "dir" ? (
              <>
                {isOpen ? (
                  <FolderOpen
                    className="shrink-0 stroke-[1.8px] text-green-800"
                    size={17}
                  />
                ) : (
                  <Folder
                    className="shrink-0 stroke-[1.8px] text-green-800"
                    size={17}
                  />
                )}
              </>
            ) : (
              <FileIcon
                fileName={entity.name}
                size={15}
                className="shrink-0 text-gray-600"
              />
            )}
          </div>
          <h1 className="text-sm select-none truncate text-green-700 font-normal">
            {entity.name}
          </h1>
        </div>
        <div
          ref={buttonRef}
          className="w-[32px] h-full flex-shrink-0 flex items-center justify-center rounded-r-md overflow-clip"
        >
          <HiOutlineDotsVertical
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="size-full hover:bg-[#86EFAC40] p-[7px] rounded-sm cursor-pointer hidden group-hover:block"
          />
        </div>
        {isMenuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            ref={menuRef}
            className="z-20 absolute h-[200%] w-full flex items-start justify-start top-8 left-4"
          >
            <EntityMenu
              setIsMenuOpen={setIsMenuOpen}
              socket={socket}
              entity={entity}
            />
          </div>
        )}
      </div>
      {isOpen === true &&
        entity.children?.map((entity, index) => {
          return (
            <Entity
              key={index}
              entity={entity}
              depth={depth + 1}
              socket={socket}
              allEntities={allEntities}
              setAllEntities={setAllEntities}
              openFolders={openFolders}
              setOpenFolders={setOpenFolders}
            />
          );
        })}
    </div>
  );
};
