"use client";
import { Panel } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import { code } from "@/lib/constants";
import { useTheme } from "./hooks";

export const CodePanel: React.FC = () => {
  useTheme();

  return (
    <Panel className="pt-6" defaultSize={46}>
      <Editor
        height="100vh"
        defaultLanguage="javascript"
        defaultValue={code}
        theme="spring-garden"
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 14,
          fontFamily: 'Menlo, Monaco, "Courier New", monospace',
          fontLigatures: true,
          fontWeight: "500",
          "semanticHighlighting.enabled":true
        }}
      />
    </Panel>
  );
};
