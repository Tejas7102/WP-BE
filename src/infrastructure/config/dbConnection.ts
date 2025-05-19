
import logger from "../logger.js"
import { sequelize } from "../orm/config/sequelizeConnection.js"

const Database = {
  init: async () => {
    try {
      logger.info("Connecting to database...")
      await sequelize.authenticate()
    } catch (err) {
      logger.debug(err)
    }
  },
}

export default Database
