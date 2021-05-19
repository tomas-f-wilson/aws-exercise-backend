import { Sequelize } from "sequelize";

import User from "../services/user/user.model";
import config from ".";

const sequelize = new Sequelize("users", "root", config.mysql.password, {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = User(sequelize, Sequelize);
export default db;
