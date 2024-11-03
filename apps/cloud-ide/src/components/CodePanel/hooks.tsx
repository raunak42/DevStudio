"use client";
import { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

export const useTheme = () => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("spring-garden", {
        base: "vs",
        inherit: true,
        rules: [
          { token: "comment", foreground: "94A3B8", fontStyle: "italic" },
          { token: "keyword", foreground: "059669", fontStyle: "bold" },
          { token: "string", foreground: "B85C38" },
          { token: "number", foreground: "C026D3", fontStyle: "bold" },
          { token: "type", foreground: "7C3AED", fontStyle: "bold" },
          { token: "function", foreground: "047857" },
          { token: "identifier", foreground: "0950A1" },           // Rich navy
          { token: "identifier.variable", foreground: "0950A1" },
          { token: "identifier.variable.readonly", foreground: "0950A1" },
          { token: "variable.readonly", foreground: "0950A1" },
          { token: "variable.defaultLibrary", foreground: "0950A1" },
          { token: "variable.local", foreground: "0950A1" },
          { token: "variable.global", foreground: "0950A1" },
          { token: "parameter.declaration", foreground: "0950A1" },
          { token: "parameter.reference", foreground: "0950A1" },
          { token: "variable.property", foreground: "0950A1" },
          { token: "member", foreground: "0950A1" },
          { token: "property", foreground: "0950A1" },
          { token: "operator", foreground: "DC2626" },
          { token: "class", foreground: "9333EA", fontStyle: "bold" },
        ],
        colors: {
          "editor.foreground": "#0F172A",
          "editor.lineHighlightBackground": "#F1F5F9",
          "editor.selectionBackground": "#E0F2FE",
          "editorCursor.foreground": "#0284C7",
          "editor.findMatchBackground": "#FDE68A",
          "editor.findMatchHighlightBackground": "#FEF3C7",
          "editorLineNumber.foreground": "#64748B",
          "editorIndentGuide.background": "#E2E8F0",
          "scrollbarSlider.background": "#F1F5F9",
          "scrollbarSlider.hoverBackground": "#E2E8F0",
          "scrollbarSlider.activeBackground": "#CBD5E1",
        },
      });

      monaco.editor.setTheme("spring-garden");
    }
  }, [monaco]);
};