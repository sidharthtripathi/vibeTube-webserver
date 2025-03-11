import { atom } from "recoil";
import type {User} from '@/schema/authSchema'
export const userState = atom<User | null>({
    key : "user",
    default : null
})

