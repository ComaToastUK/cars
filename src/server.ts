import { AppBuilder } from './app'
import http from 'http'

const startServer = async (): Promise<void> => {
    const port = process.env.PORT || '3000'
    const app = new AppBuilder().build()
    const server = http.createServer(app)
    
    server.listen(port, () => {
      console.log('Started server on port: ' + port)
    })
}

startServer()