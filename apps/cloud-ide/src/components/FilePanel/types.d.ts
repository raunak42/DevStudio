import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";

export interface EntityConponentProps {
    entity: entity;
    depth: number;
    socket: Socket | null;
    allEntities: entity[];
    setAllEntities: Dispatch<SetStateAction<entity[]>>;
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

export interface clickDirProps {
    socket: Socket | null;
    entity: entity;
    showOpen: boolean;
    setShowOpen: Dispatch<SetStateAction<boolean>>;
    setAllEntities: Dispatch<SetStateAction<entity[]>>;
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
}