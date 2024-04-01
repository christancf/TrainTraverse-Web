import { atom } from "jotai";

const loginStateAtom = atom({
    accessToken: "",
    loggedIn: false,
    username: "",
    role: "", 
});


export { loginStateAtom }