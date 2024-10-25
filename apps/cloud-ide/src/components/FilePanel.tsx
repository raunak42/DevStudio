import { File, Folder } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Panel } from "react-resizable-panels";
import { Socket } from "socket.io-client";

export interface FilePanelProps {
  entities: entity[];
  socket: Socket | null;
}

type entity = {
  type: "dir" | "file";
  name: string;
  path: string;
  children: entity[];
};

export const FilePanel: React.FC<FilePanelProps> = ({
  entities,
  socket,
}) => {
  const [allEntities, setAllEntities] = useState<entity[]>(entities);

  return (
    <Panel className="bg-white ">
      <div className="flex flex-col h-full w-full overflow-y-scroll">
        {allEntities.map((entity, index) => {
          return (
            <EntityComponent
              key={index}
              entity={entity}
              depth={0}
              socket={socket}
              allEntities={allEntities}
              setAllEntities={setAllEntities}
            />
          );
        })}
      </div>
    </Panel>
  );
};

const EntityComponent = ({
  entity,
  depth,
  socket,
  allEntities,
  setAllEntities,
}: {
  entity: entity;
  depth: number;
  socket: Socket | null;
  allEntities: entity[];
  setAllEntities: Dispatch<SetStateAction<entity[]>>;
}) => {
  const handleClick = () => {
    if (!socket) return;
    if (entity.type === "dir") {
      socket.emit("getDirContents", entity.path, (entityContents: entity[]) => {
        entityContents.forEach(
          (childEntity) =>
            (childEntity.path = `${entity.path}/${childEntity.path}`)
        );
        setAllEntities((prev) => {
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
  };

  useEffect(() => {
    console.log(allEntities);
  }, [allEntities]);

  return (
    <div style={{ marginLeft: depth * 20 }}>
      <div
        onClick={handleClick}
        className=" p-6 shrink-0 cursor-pointer w-full h-[40px] flex flex-row items-center justify-start gap-4 hover:bg-gray-200 rounded-md"
      >
        {entity.type === "dir" ? (
          <Folder className="shrink-0" />
        ) : (
          <File className="shrink-0" />
        )}
        <h1 className="shrink-0">{entity.name}</h1>
      </div>
      {entity.children?.map((entity, index) => {
        return (
          <EntityComponent
            key={index}
            entity={entity}
            depth={depth + 1}
            socket={socket}
            allEntities={allEntities}
            setAllEntities={setAllEntities}
          />
        );
      })}
    </div>
  );
};
