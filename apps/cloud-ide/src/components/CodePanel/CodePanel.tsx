"use client";
import { Panel } from "react-resizable-panels";
import Editor from "@monaco-editor/react";
import { useTheme } from "./hooks";
import { useRecoilValue } from "recoil";
import { fileState } from "@/store";
import { useEffect } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import { File } from "lucide-react";

export const CodePanel: React.FC = () => {
  const file = useRecoilValue(fileState);
  useTheme();

  useEffect(() => {
    import("monaco-editor").then((monaco) => {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
    });
  }, []);

  useEffect(() => {
    console.log(file.language);
  }, [file]);

  let pathArray: string[] = [];
  let lastIndex: number;
  let path: string | null = null;

  if (file.entity) {
    path = file.entity.path;
    pathArray = path.split("/");
    lastIndex = pathArray.length - 1;
  }

  return (
    <Panel className="flex flex-col " defaultSize={46}>
      {path && (
        <>
          <div className="w-full h-[38px] flex items-center  justify-start px-4 ">
            {pathArray.map((t, index) => {
              return (
                <div key={index} className="flex flex-row items-center">
                  <h1 className="text-sm text-gray-500">{t}</h1>
                  {t && index !== lastIndex && (
                    <IoChevronForwardOutline className="text-gray-500 size-[12px] " />
                  )}
                </div>
              );
            })}
            {/* {!path && <h1 className="text-sm text-gray-500">Select a file</h1>} */}
          </div>
          {file.content && file.language && (
            <Editor
              height="100vh"
              value={file.content}
              language={file.language}
              theme="spring-garden"
              options={{
                minimap: {
                  enabled: false,
                },
                fontSize: 14,
                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                fontLigatures: true,
                fontWeight: "500",
                "semanticHighlighting.enabled": false,
                hover: {
                  enabled: false,
                },
                renderValidationDecorations: "off",
                wordWrap: "on",
              }}
            />
          )}
        </>
      )}
      {!path && (
        <div className="h-full w-full flex flex-col items-center justify-start mt-[200px] gap-1 ">
          <File className="size-[72px] stroke-[0.5px] text-gray-400" />
          <h1 className="text-base text-gray-500">Select a file</h1>
        </div>
      )}
    </Panel>
  );
};
