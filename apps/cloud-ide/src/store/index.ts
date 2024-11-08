import { entity } from "@/components/FilePanel/types";
import { atom } from "recoil";

export const ScrollToState = atom({
    key: "ScrollToState",
    default: {
        section: "",
        clicked: false
    },
})

export const CloseTermState = atom({
    key: "CloseTermState",
    default: {
        terminalId: "",
        close: false
    }
})

export const HomeClickedState = atom<boolean>({
    key: "HomeClickedState",
    default: false
})

export const fileState = atom<{ content: string | null, language: string | null, entity: entity | null }>({
    key: "fileState",
    default: {
        content: null,
        language: null,
        entity: null
    }
})