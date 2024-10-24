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