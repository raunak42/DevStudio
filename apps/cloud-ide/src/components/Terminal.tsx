"use client";
import {
  HTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket } from "socket.io-client";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import "@xterm/xterm/css/xterm.css";
import { terminalThemes } from "@/lib/terminalThemes";
import { useRecoilValue } from "recoil";
import { CloseTermState } from "@/store";

interface WebTerminalProps extends HTMLAttributes<HTMLElement> {
  socket: Socket;
  terminalId: string;
}

export const WebTerminal: React.FC<WebTerminalProps> = ({
  socket,
  terminalId,
  ...props
}) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [term, setTerm] = useState<Terminal | null>(null);
  const [theme, setTheme] = useState({});
  const [fitAddon, setFitAddon] = useState<FitAddon | null>(null);
  const closeTerm = useRecoilValue(CloseTermState);

  const closeTerminal = useCallback(() => {
    if (term) {
      term.dispose();
      socket.emit("closeTerminal", terminalId);
    }
    setTerm(null);
  }, [socket, term, terminalId]);

  useEffect(() => {
    if (closeTerm.terminalId === terminalId && closeTerm.close === true) {
      closeTerminal();
    }
  }, [closeTerm, closeTerminal, terminalId]);

  // Handle terminal resize
  const handleTerminalResize = useCallback(() => {
    if (!fitAddon) return;
    fitAddon.fit();
  }, [fitAddon]);

  useEffect(() => {
    setIsInitialized(true);
    const initPty = () => {
      if (!isInitialized) return;
      socket.emit("requestPty", terminalId);
    };

    initPty();
  }, [isInitialized, socket, terminalId]);

  // Handle window resize
  useEffect(() => {
    if (!term || !fitAddon) return;

    const resizeObserver = new ResizeObserver(() => {
      handleTerminalResize();
    });

    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [term, fitAddon, handleTerminalResize]);

  useEffect(() => {
    const theme = getTheme(ThemeName.punchyLight);
    if (theme) setTheme(theme);
  }, []);

  useEffect(() => {
    if (!terminalRef.current || !socket || !theme) return;
    const newTerm = new Terminal({
      cursorBlink: true,
      fontSize: 14,
      theme: theme,
      allowTransparency: true,
      convertEol: true,
      disableStdin: false,
    });

    const newFitAddon = new FitAddon();
    newTerm.loadAddon(newFitAddon);

    setTerm(newTerm);
    setFitAddon(newFitAddon);

    newTerm.open(terminalRef.current);

    // Initial fit
    setTimeout(() => {
      newFitAddon.fit();
    }, 0);

    newTerm.onKey(({ key }) => {
      socket.emit("keyEvent", {
        terminalId: terminalId,
        input: key,
      });
    });

    const handlePtyOutput = (data: { terminalId: string; data: string }) => {
      if (data.terminalId === terminalId) {
        newTerm.write(data.data);
      }
    };

    socket.on("ptyOutput", handlePtyOutput);

    return () => {
      socket.off("ptyOutput", handlePtyOutput);
      newTerm.dispose();
    };
  }, [socket, terminalId, theme]);

  return <div {...props} className="w-full h-full pl-[4px]" ref={terminalRef}></div>;
};

enum ThemeName {
  Dracula = "Dracula",
  OneDark = "One Dark",
  Monokai = "Monokai",
  SolarizedDark = "Solarized Dark",
  MintFresh = "Mint Fresh",
  SpringMorning = "Spring Morning",
  SoftBreeze = "Soft Breeze",
  LavenderMorning = "Lavender Morning",
  OceanBreeze = "Ocean Breeze",
  BrightLight = "Bright Light",
  HCLight = "High Contrast Light",
  SnowWhite = "Snow White",
  SolLight = "Solarized Light",
  punchyLight = "Punchy Light",
}

const getTheme = (themeName: ThemeName) => {
  const theme = terminalThemes.find((t) => t.name === themeName);
  return theme?.theme;
};
