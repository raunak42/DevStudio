import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface EntityConponentProps {
    entity: entity;
    depth: number;
    socket: Socket | null;
    allEntities: entity[];
    setAllEntities: Dispatch<SetStateAction<entity[]>>;
    openFolders: string[];
    setOpenFolders: Dispatch<SetStateAction<string[]>>
}

export interface entity {
    type: "dir" | "file";
    name: string;
    path: string;
    children?: entity[];
}

export interface getRootContentsProps {
    socket: Socket | null;
    setAllEntities: Dispatch<SetStateAction<entity[]>>
}

export interface handleDirClickProps {
    socket: Socket | null;
    entity: entity;
    setAllEntities: Dispatch<SetStateAction<entity[]>>;
    openFolders: string[];
    setOpenFolders: Dispatch<SetStateAction<string[]>>
}

export interface handleFileClickProps {
    socket: Socket | null;
    entity: entity;
    setFile:SetterOrUpdater<{
        content: string;
        language: string;
    }>
}

export interface watcherAddDirProps {
    entity: entity;
    setAllEntities: Dispatch<SetStateAction<entity[]>>;
    socket: Socket | null;
}

export interface getFreshDataProps {
    socket: Socket | null;
    entity: entity;
    setAllEntities: Dispatch<SetStateAction<entity[]>>;

}

export interface useWatcherProps {
    socket: Socket | null;
    entity: entity;
    setAllEntities: Dispatch<SetStateAction<entity[]>>;
    openFolders: string[];
    setOpenFolders: Dispatch<SetStateAction<string[]>>
}