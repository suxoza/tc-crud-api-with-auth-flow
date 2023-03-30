
import { User } from "./userInterface"

export interface Post {
    _id?: number,
    creator?: User,
    title: String,
    description: string,
    createdAt?: string
}