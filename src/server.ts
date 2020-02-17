import { AppBuilder } from './app'
import { createConnection } from './mongodb'
import http from 'http'
import { Kernel } from './inversify.config'
import * as dotenv from 'dotenv'

dotenv.config()

const startServer = async (): Promise<void> => {
    const connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/'
    const dbName = process.env.MONGODB_NAME || 'cars'
    const port = process.env.PORT || '3000'
    const db = await createConnection(connectionString, dbName)
    const kernel = new Kernel(db)
    const app = new AppBuilder(kernel).build()
    app.set('port', port)
    const server = http.createServer(app)
    
    server.listen(port, () => {
      console.log('Started server on port: ' + port)
    })
}

startServer()