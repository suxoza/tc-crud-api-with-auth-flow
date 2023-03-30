import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./models/User"
import { Post } from "./models/Post"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: true,
    entities: [User, Post],
    migrations: [],
    subscribers: [],
})


AppDataSource.initialize().then(() => {

}).catch((error) => console.log(error))
