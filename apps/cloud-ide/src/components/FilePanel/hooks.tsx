import { useEffect, useCallback } from "react";
import { useWatcherProps } from "./types";
import { getFreshData, getRootContents } from "./helpers";

export const useWatcher = ({
  socket,
  entity,
  setAllEntities,
  openFolders,
  setOpenFolders,
}: useWatcherProps) => {
  const handleWatcherEvent = useCallback(
    ({ path, event }: { path: string; event: string }) => {
      if (!socket) return;

      const pathArray = path.split("/").filter((t) => t !== "");
      const currentEntityPath = entity.path.split("/").filter((t) => t !== "");
      const parentDir = pathArray[pathArray.length - 2];
      const superParent = pathArray[0];

      // Case 1: Changes in root directory
      if (parentDir === superParent || pathArray.length === 1) {
        getRootContents({ socket, setAllEntities });
        return;
      }

      // Case 2: Direct changes in current entity's directory
      if (entity.name === parentDir) {
        getFreshData({ socket, entity, setAllEntities });
        return;
      }

      // Case 3: Changes in nested directories
      const isAncestor = currentEntityPath.every(
        (segment, index) => pathArray[index] === segment
      );

      if (isAncestor) {
        getFreshData({ socket, entity, setAllEntities });
      }
      console.log(event);
    },
    [socket, entity, setAllEntities, setOpenFolders]
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("watcherEvent", handleWatcherEvent);

    return () => {
      socket.off("watcherEvent", handleWatcherEvent);
    };
  }, [socket, handleWatcherEvent]);
};
