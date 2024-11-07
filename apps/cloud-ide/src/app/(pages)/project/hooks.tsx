"use client"
import { API_BASE_URL } from "@/lib/constants";
import { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Terminal } from "./page";
import { entity } from "@/components/FilePanel/types";
import { sortEntities } from "@/components/FilePanel/helpers";

interface useSocketProps {
  userId: string | null;
  projectId: string | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
}

export const useSocket = ({ projectId, setSocket, userId }: useSocketProps) => {
  useEffect(() => {
    const newSocket = io(
      `${API_BASE_URL}?userId=${userId}&projectId=${projectId}`
    );
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [projectId, userId]);
};

interface useLoadedEventProps {
  socket: Socket | null;
  setFiles: Dispatch<SetStateAction<entity[] | null | undefined>>;
  addNewTerminal: () => void;
}

export const useLoadedEvent = ({
  socket,
  setFiles,
  addNewTerminal,
}: useLoadedEventProps) => {
  useEffect(() => {
    if (!socket) return;
    socket.on("files-loaded", (data) => {
      if (data.rootContent) {
        setFiles(sortEntities(data.rootContent));
        addNewTerminal();
      }
    });
  }, [socket, addNewTerminal]);
};

interface useFixScrollProps {
  scrollContainerRef: RefObject<HTMLDivElement>;
  terminals: Terminal[];
}

export const useFixScroll = ({
  scrollContainerRef,
  terminals,
}: useFixScrollProps) => {
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [terminals]);
};

interface useDisconnectViaButtonProps {
  socket: Socket | null;
  homeButtonClicked: boolean;
}

export const useDisconnectViaButton = ({
  socket,
  homeButtonClicked,
}: useDisconnectViaButtonProps) => {
  useEffect(() => {
    if (!socket) return;
    if (homeButtonClicked === true) {
        socket.disconnect();
    }
  }, [homeButtonClicked, socket]);
};
