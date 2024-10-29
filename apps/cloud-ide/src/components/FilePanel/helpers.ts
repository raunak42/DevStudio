// helpers.ts
import {
    clickDirProps,
    entity,
    getFreshDataProps,
    getRootContentsProps
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
                // Create a map of existing entities with their children for quick lookup
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

                // Update new entities with existing children if available
                const updatedContents = entityContents.map(newEntity => {
                    const prevEntity = prevEntityMap.get(newEntity.path);
                    if (prevEntity?.children) {
                        return { ...newEntity, children: prevEntity.children };
                    }
                    return newEntity;
                });

                return updatedContents;
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
            // Update paths for all children
            entityContents.forEach(
                (childEntity) => {
                    childEntity.path = `${entity.path}/${childEntity.name}`;
                }
            );

            setAllEntities((prev: entity[]) => {
                // Create a map of all existing entities with their children
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
                            // For the directory being refreshed, merge new content with existing children
                            const updatedChildren = entityContents.map(newChild => {
                                const existingChild = prevEntityMap.get(`${entity.path}/${newChild.name}`);
                                if (existingChild?.children) {
                                    return { ...newChild, children: existingChild.children };
                                }
                                return newChild;
                            });

                            return {
                                ...prevEntity,
                                children: updatedChildren,
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

export const clickDir = ({
    entity,
    setAllEntities,
    setShowOpen,
    showOpen,
    socket,
}: clickDirProps) => {
    if (!socket || entity.type !== "dir") return;

    setShowOpen(!showOpen)
    
    if (!showOpen) {
        getFreshData({ socket, entity, setAllEntities });
    }
};