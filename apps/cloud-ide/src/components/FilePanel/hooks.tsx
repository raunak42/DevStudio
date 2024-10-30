import { useEffect, useCallback } from "react";
import { useWatcherProps } from "./types";
import { getFreshData, getRootContents } from "./helpers";

export const useWatcher = ({
  socket,
  entity,
  setAllEntities,
}: useWatcherProps) => {
  const handleWatcherEvent = useCallback(
    (data: { path: string; event: string }) => {
      if (!socket) return;

      const path = data.path;
      
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
    },
    [socket, entity, setAllEntities]
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("watcherEvent", handleWatcherEvent);

    return () => {
      socket.off("watcherEvent", handleWatcherEvent);
    };
  }, [socket, handleWatcherEvent]);
};
