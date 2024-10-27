import { useEffect } from "react";
import { useWatcherProps } from "./types";
import { getFreshData, getRootContents } from "./helpers";

export const useWatcher = ({
  socket,
  entity,
  setAllEntities,
}: useWatcherProps) => {
  useEffect(() => {
    if (!socket ) return;
    socket.on("watcherEvent", (path: string) => {
      const pathArray = path.split("/").filter((t) => t !== "");
      const parentDir = pathArray[pathArray.length - 2];
      const superParent = pathArray[0];
      
      if (parentDir === superParent) {
        getRootContents({ socket, setAllEntities });
      }
      if (entity.name === parentDir) {
        getFreshData({ socket, entity, setAllEntities });
      }
    });
  }, [socket, entity, setAllEntities]);
};

