import { clickDirProps, entity, getFreshDataProps, getRootContentsProps } from "./types";

export const getRootContents = ({ socket, setAllEntities }: getRootContentsProps) => {
    if (!socket) return
    socket.emit("getDirContents", "/", (entityContents: entity[]) => {
        setAllEntities((prev) => {
            const newContents = entityContents.filter(
                (newEntity) =>
                    !prev.some((prevEntity) => prevEntity.path === newEntity.path)
            );
            const deletedContents = prev.filter(prevEntity =>
                !entityContents.some(newEntity => newEntity.path === prevEntity.path)
            ); if (!deletedContents) {
                return [...prev, ...newContents];
            } else {
                return entityContents
            }
        });
    });
}

export const clickDir = ({
    entity,
    setAllEntities,
    setShowOpen,
    showOpen,
    socket,
}: clickDirProps) => {
    if (!socket) return;
    if (entity.type === "dir") {
        setShowOpen(!showOpen);
        if (showOpen === false)
            getFreshData({ socket, entity, setAllEntities })
    }
};

// export const watcherAddDir = ({ entity, setAllEntities, socket }: watcherAddDirProps) => {
//     getFreshData({ socket, entity, setAllEntities })
// }

export const getFreshData = ({ socket, entity, setAllEntities }: getFreshDataProps) => {
    if (!socket) return

    socket.emit("getDirContents", entity.path, (entityContents: entity[]) => { //getRootContents
        entityContents.forEach(
            (childEntity) =>
                (childEntity.path = `${entity.path}/${childEntity.path}`)
        );

        setAllEntities((prev: entity[]) => {
            const modifyEntities = (prev: entity[]): entity[] => {
                const modifiedEntities = prev.map((prevEntity) => {
                    if (prevEntity.path === entity.path) {
                        return {
                            ...prevEntity,
                            children: entityContents,
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
                return modifiedEntities;
            };
            return modifyEntities(prev);
        });
    });
}