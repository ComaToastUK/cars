import { Db, MongoClient } from 'mongodb'

export const createConnection = async (connectionString: string, dbName: string): Promise<Db> => {
  return new Promise<Db>((resolve, reject) => {
    MongoClient.connect(connectionString,
      { useUnifiedTopology: true }, (error, client) => {
        if (error) reject(error)
        const db = client.db(dbName)
        resolve(db)
      })
  })
}