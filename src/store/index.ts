import { atom } from "recoil";

export const ScrollToState = atom({
    key: "ScrollToState",
    default: {
        section: "",
        clicked: false
    },
})