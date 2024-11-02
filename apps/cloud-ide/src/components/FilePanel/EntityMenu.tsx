import React, { Dispatch, SetStateAction, useState } from "react";
import { Pencil, Trash2, FolderPlus, FilePlus, Check, X } from "lucide-react";
import { entity } from "./types";
import { Socket } from "socket.io-client";
import { cn } from "@/lib/utils";

interface EntityMenuProps {
  entity: entity;
  socket: Socket | null;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export const EntityMenu: React.FC<EntityMenuProps> = ({ entity, socket,setIsMenuOpen }) => {
  const isFolder = entity.type === "dir";
  const [isRenaming, setIsRenaming] = useState(false);
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newName, setNewName] = useState(entity.name);
  const [newFileName, setNewFileName] = useState("");
  const [newFolderName, setNewFolderName] = useState("");

  const handleRename = () => {
    if (!socket || !newName) return;
    console.log("Renaming to:", newName);
    socket.emit("rename", { entity, newName });
    setIsRenaming(false);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    if (!socket) return;
    socket.emit("delete", { entity });
    setIsMenuOpen(false);
  };

  const handleAddFile = () => {
    if (!socket || !newFileName) return;
    console.log("Adding file:", newFileName);
    socket.emit("addFile", { parentDir: entity, fileName: newFileName });
    setIsAddingFile(false);
    setIsMenuOpen(false);
  };

  const handleAddFolder = () => {
    if (!socket || !newFolderName) return;
    console.log("Adding folder:", newFolderName);
    socket.emit("addFolder", { parentDir: entity, folderName: newFolderName });
    setIsAddingFolder(false);
    setIsMenuOpen(false);
  };

  const handleCancel = (type: "rename" | "file" | "folder") => {
    switch (type) {
      case "rename":
        setNewName(entity.name);
        setIsRenaming(false);
        break;
      case "file":
        setNewFileName("");
        setIsAddingFile(false);
        break;
      case "folder":
        setNewFolderName("");
        setIsAddingFolder(false);
        break;
    }
  };

  const renderInputField = (
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onConfirm: () => void,
    onCancel: () => void
  ) => (
    <div className="px-3 py-2">
      <div className="flex items-center gap-1">
        <input
          onFocus={(e) => e.target.select()}
          type="text"
          value={value}
          onChange={onChange}
          className={cn(
            "block w-28 min-w-0 px-1 py-0.5 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          )}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") onConfirm();
            if (e.key === "Escape") onCancel();
          }}
        />
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={onConfirm}
            className="p-0.5 text-green-600 hover:text-green-700 rounded hover:bg-gray-100"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onCancel}
            className="p-0.5 text-gray-600 hover:text-gray-700 rounded hover:bg-gray-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "w-[180px] bg-white border-[1px] border-gray-400 rounded-md shadow-lg py-1 select-none"
      )}
    >
      {/* Folder-specific options */}
      {isFolder && (
        <>
          {isAddingFile ? (
            renderInputField(
              newFileName,
              (e) => setNewFileName(e.target.value),
              handleAddFile,
              () => handleCancel("file")
            )
          ) : (
            <button
              onClick={() => setIsAddingFile(true)}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FilePlus className="w-4 h-4 mr-2" />
              Add File
            </button>
          )}

          {isAddingFolder ? (
            renderInputField(
              newFolderName,
              (e) => setNewFolderName(e.target.value),
              handleAddFolder,
              () => handleCancel("folder")
            )
          ) : (
            <button
              onClick={() => setIsAddingFolder(true)}
              className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Add Folder
            </button>
          )}

          <div className="border-t border-gray-400 my-1"></div>
        </>
      )}

      <div className="space-y-1">
        {/* Rename section */}
        {isRenaming ? (
          renderInputField(
            newName,
            (e) => setNewName(e.target.value),
            handleRename,
            () => handleCancel("rename")
          )
        ) : (
          <button
            onClick={() => setIsRenaming(true)}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Rename
          </button>
        )}

        <button
          onClick={handleDelete}
          className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default EntityMenu;
