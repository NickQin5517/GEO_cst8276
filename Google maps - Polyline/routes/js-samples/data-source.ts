import "reflect-metadata"
import { DataSource } from "typeorm"
import { Coordinate } from "./entity/Coordinate"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "DBcst8276",
    password: "8276",
    database: "cst8276",
    synchronize: true,
    logging: true,
    entities: [Coordinate],
    migrations: [],
    subscribers: [],
})
