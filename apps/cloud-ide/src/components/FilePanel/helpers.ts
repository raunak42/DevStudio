// helpers.ts
import { extensionMap } from "@/lib/constants";
import {
    entity,
    getFreshDataProps,
    getRootContentsProps,
    handleDirClickProps,
    handleFileClickProps
} from "./types";

export const findEntityByPath = (
    entities: entity[],
    targetPath: string
): entity | null => {
    for (const entity of entities) {
        if (entity.path === targetPath) {
            return entity;
        }
        if (entity.children) {
            const found = findEntityByPath(entity.children, targetPath);
            if (found) return found;
        }
    }
    return null;
};

export const getRootContents = async ({
    socket,
    setAllEntities
}: getRootContentsProps) => {
    if (!socket) return;

    try {
        socket.emit("getDirContents", "/", (entityContents: entity[]) => {
            setAllEntities((prev) => {
                const prevEntityMap = new Map<string, entity>();
                const mapEntities = (entities: entity[]) => {
                    entities.forEach(entity => {
                        prevEntityMap.set(entity.path, entity);
                        if (entity.children) {
                            mapEntities(entity.children);
                        }
                    });
                };
                mapEntities(prev);

                const updatedContents = entityContents.map(newEntity => {
                    const prevEntity = prevEntityMap.get(newEntity.path);
                    if (prevEntity?.children) {
                        return { ...newEntity, children: sortEntities(prevEntity.children) };
                    }
                    return newEntity;
                });

                return sortEntities(updatedContents);
            });
        });
    } catch (error) {
        console.error("Error fetching root contents:", error);
    }
};

export const getFreshData = async ({
    socket,
    entity,
    setAllEntities
}: getFreshDataProps) => {
    if (!socket) return;

    try {
        socket.emit("getDirContents", entity.path, (entityContents: entity[]) => {
            entityContents.forEach(
                (childEntity) => {
                    childEntity.path = `${entity.path}/${childEntity.name}`;
                }
            );

            setAllEntities((prev: entity[]) => {
                const prevEntityMap = new Map<string, entity>();
                const mapEntities = (entities: entity[]) => {
                    entities.forEach(entity => {
                        prevEntityMap.set(entity.path, entity);
                        if (entity.children) {
                            mapEntities(entity.children);
                        }
                    });
                };
                mapEntities(prev);

                const modifyEntities = (entities: entity[]): entity[] => {
                    return entities.map((prevEntity) => {
                        if (prevEntity.path === entity.path) {
                            const updatedChildren = entityContents.map(newChild => {
                                const existingChild = prevEntityMap.get(`${entity.path}/${newChild.name}`);
                                if (existingChild?.children) {
                                    return { ...newChild, children: sortEntities(existingChild.children) };
                                }
                                return newChild;
                            });

                            return {
                                ...prevEntity,
                                children: sortEntities(updatedChildren),
                            };
                        }

                        if (prevEntity.children) {
                            return {
                                ...prevEntity,
                                children: modifyEntities(prevEntity.children),
                            };
                        }

                        return prevEntity;
                    });
                };

                return modifyEntities(prev);
            });
        });
    } catch (error) {
        console.error("Error fetching fresh data:", error);
    }
};


export const handleDirClick = ({
    entity,
    setAllEntities,
    setOpenFolders,
    openFolders,
    socket,
}: handleDirClickProps) => {
    if (!socket || entity.type !== "dir") return;

    if (openFolders.includes(entity.path)) {
        setOpenFolders((prev) => prev.filter((path) => path !== entity.path));
    } else {
        setOpenFolders((prev) => [...prev, entity.path]);
        getFreshData({ socket, entity, setAllEntities });
    }
};

export const handleFileClick = ({ socket, entity, setFile }: handleFileClickProps) => {
    if (!socket || entity.type !== "file") return;
    const extension = entity.name.split(".").pop()!
    const language = extensionToLanguageName(extension)
    socket.emit("getFileContent", entity.path, (content: string) => {
        setFile({
            content: content,
            language: language,
            entity: entity
        })
    })
}

export function sortEntities(entities: entity[]): entity[] {
    const [regularEntities, hiddenEntities] = entities.reduce(
        ([regular, hidden], entity) => {
            if (entity.name.startsWith('.')) {
                return [regular, [...hidden, entity]];
            } else {
                return [[...regular, entity], hidden];
            }
        },
        [[] as entity[], [] as entity[]]
    );

    return [...regularEntities.sort((a, b) => {
        if (a.type === 'dir' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'dir') return 1;
        return a.name.localeCompare(b.name);
    }), ...hiddenEntities];
}

const extensionToLanguageName = (extension: string) => {
    const languageName = extensionMap[extension.toLowerCase()] || "plaintext";
    return languageName;
};