import { IPty, spawn } from "node-pty";
import { Terminal } from "./ws";
import { Socket } from "socket.io";

export const newPtyProcess = (workspaceLocation: string) => {
    const SHELL = 'bash';

    const ptyProcess = spawn(SHELL, [], {
        name: "xterm-256color",
        cols: 80,
        rows: 24,
        env: {
            ...process.env,
            TERM: "xterm-256color",
            COLORTERM: "truecolor",
            TERM_PROGRAM: "xterm-256color",
            FORCE_COLOR: "3",
            PATH: process.env.PATH || '/usr/local/bin:/usr/bin:/bin',
            HOME: workspaceLocation,
            CDPATH: '',
            npm_config_prefix: workspaceLocation,
            SHELL: SHELL,
            PROMPT_COMMAND: '',
            PROMPT_DIRTRIM: '0',
            PS1: '',
            PS2: '',
            PS3: '',
            PS4: ''
        },
        cwd: workspaceLocation,
    });

    return ptyProcess
}

export const writeInitCommands = async (ptyProcess: IPty, workspaceName: string) => {
    await new Promise<void>((resolve) => {
        // Disable echo
        ptyProcess.write('stty -echo\n');
        ptyProcess.write('\x1b[2J\x1b[H\n');
        ptyProcess.write('unset PROMPT_COMMAND\n');
        // Custom prompt
        ptyProcess.write(`PS1="\\[\\033[01;32m\\]${workspaceName}~\\[\\033[00m\\]$ "\n`);
        // Color
        ptyProcess.write('export CLICOLOR=1\n');
        ptyProcess.write('export LSCOLORS=ExFxBxDxCxegedabagacad\n');
        ptyProcess.write('alias ls="ls --color=auto"\n');
        ptyProcess.write('alias grep="grep --color=auto"\n');
        // Clear screen after .write()
        ptyProcess.write('\x1b[2J\x1b[H\n');
        // Enable echo for user
        ptyProcess.write('stty echo\n');
        resolve()
    })
}

export const skipInitOutputs = (newTerminal: Terminal, socket: Socket) => { //For the commands we wrote.
    let isFirstOutput = true;

    newTerminal.ptyProcess.onData((data: string) => {
        if (isFirstOutput) {
            isFirstOutput = false;
            return;
        }

        // Skip the outputs that contain initial setup commands.
        if (
            data.includes('stty') ||
            data.includes('export') ||
            data.includes('alias') ||
            data.includes('unset PROMPT_COMMAND') ||
            data.includes('PS1=')
        ) {
            return;
        }

        socket.emit("ptyOutput", { terminalId: newTerminal.id, data });
    });
}