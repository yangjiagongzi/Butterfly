import Database from 'better-sqlite3'
import { app } from 'electron'
import path from 'path'
import Config from '~/config'

const databasePath = path.join(app.getPath('userData'), Config.get('DATABASE_PATH'))

class DB {
  private db: Database.Database | undefined
  getDatabase = async () => {
    if (this.db && this.db.open) {
      return this.db
    }
    this.db = new Database(databasePath)
    return this.db
  }
}

export default new DB()
