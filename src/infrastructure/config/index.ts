import * as Process from "process"

import { Dialect } from "sequelize"
import { Config, DatabaseInfo } from "./types.js"

const database: DatabaseInfo =
  Process.env.JEST_WORKER_ID === undefined && Process.env.RUNNING_TESTS !== "1"
    ? {
        name: Process.env.DB_NAME || "sqldb-db",
        host: Process.env.DB_HOST || "localhost",
        port: Number(Process.env.DB_PORT || 3306),
        user: Process.env.DB_USER || "root",
        pwd: Process.env.DB_PWD || "root",
        dialect: (Process.env.DB_DIALECT as Dialect | undefined) || "mysql",
        sslRequired: Process.env.DB_SSL_REQUIRED === undefined ? true : Process.env.DB_SSL_REQUIRED === "true",
      }
    : {
        name: Process.env.DB_NAME_TEST as string,
        host: Process.env.DB_HOST_TEST as string,
        port: Number(Process.env.DB_PORT_TEST),
        user: Process.env.DB_USER_TEST as string,
        pwd: Process.env.DB_PWD_TEST as string,
        dialect: "mysql",
        sslRequired: false,
      }

const isTrue = (envVar: string | undefined) => envVar === undefined || envVar === "true"

const config: Config = {
  port: Process.env.PORT || "8000",
  env: Process.env.NODE_ENV || "development",

  logs: {
    level: Process.env.NODE_ENV === "production" ? "info" : "debug",
  },

  api: {
    prefix: `/api/${Process.env.API_VERSION ? Process.env.API_VERSION : "v1"}`,
    version: Process.env.API_VERSION || "v1",
  },

  // Whether to receive and process events from Azure event hub
  allowApiCall: isTrue(Process.env.ALLOW_API_CALL),
  database,
  timeZone: Process.env.TIME_ZONE || "Asia/Tokyo",
}

export default config
