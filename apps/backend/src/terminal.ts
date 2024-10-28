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
            // Unset any existing prompt settings
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
        // Disable echo and clear any startup messages
        ptyProcess.write('stty -echo\n');
        ptyProcess.write('\x1b[2J\x1b[H\n');

        // Unset any existing prompt settings
        ptyProcess.write('unset PROMPT_COMMAND\n');

        // Set our custom prompt
        ptyProcess.write(`PS1="\\[\\033[01;32m\\]~${workspaceName}\\[\\033[00m\\]$ "\n`);

        // Set up color support
        ptyProcess.write('export CLICOLOR=1\n');
        ptyProcess.write('export LSCOLORS=ExFxBxDxCxegedabagacad\n');
        ptyProcess.write('alias ls="ls --color=auto"\n');
        ptyProcess.write('alias grep="grep --color=auto"\n');

        // Clear the screen again
        ptyProcess.write('\x1b[2J\x1b[H\n');

        // Re-enable echo for user input
        ptyProcess.write('stty echo\n');
        resolve()
    })
}

export const skipInitOutputs = (newTerminal: Terminal, socket: Socket) => {
    let isFirstOutput = true;

    newTerminal.ptyProcess.onData((data: string) => {
        // Skip the first output which contains startup messages
        if (isFirstOutput) {
            isFirstOutput = false;
            return;
        }

        // Skip output that contains our setup commands
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