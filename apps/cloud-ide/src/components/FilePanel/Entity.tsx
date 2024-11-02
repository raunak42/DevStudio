import { cn } from "@/lib/utils";
import { clickDir } from "./helpers";
import { useWatcher } from "./hooks";
import { EntityConponentProps } from "./types";
import { Folder, FolderOpen } from "lucide-react";
import { FileIcon } from "./FileIcons";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";
import { EntityMenu } from "./EntityMenu";

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
    } else {
      clickDir({
        entity,
        setAllEntities,
        socket,
        openFolders,
        setOpenFolders,
      });
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
          "relative group h-[28px] shrink-0 cursor-pointer w-full flex flex-row items-center justify-between hover:bg-gray-100 rounded-md",
          `${depth === 0 ? "px-2" : "px-2"}`
        )}
        title={entity.name}
      >
        <div className="flex items-center justify-start gap-[6px] shrink-0 flex-1 min-w-0 z-0">
          <div className="w-[18px] flex-shrink-0">
            {entity.type === "dir" ? (
              <>
                {isOpen ? (
                  <FolderOpen
                    className="shrink-0 stroke-[1.5px] text-gray-700"
                    size={17}
                  />
                ) : (
                  <Folder
                    className="shrink-0 stroke-[1.5px] text-gray-700"
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
          <h1 className="text-sm select-none truncate text-gray-700">
            {entity.name}
          </h1>
        </div>
        <div ref={buttonRef} className="w-[18px] flex-shrink-0">
          <HiOutlineDotsVertical
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className="size-4 hover:bg-gray-200 p-[2px] rounded-sm cursor-pointer hidden group-hover:block"
          />
        </div>
        {isMenuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            ref={menuRef}
            className="z-20 absolute h-[200%] w-full flex items-start justify-start top-8 left-4"
          >
            <EntityMenu setIsMenuOpen={setIsMenuOpen} socket={socket} entity={entity} />
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
