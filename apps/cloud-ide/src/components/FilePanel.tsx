import { Panel } from "react-resizable-panels";

export const FilePanel: React.FC = () => {
  return (
    <Panel
      className=" relative overflow-hidden bg-gray-100"
      defaultSize={20}
    ></Panel>
  );
};
