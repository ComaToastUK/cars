import app from 'express'
import http from 'http'

const startServer = async (): Promise<void> => {
    const port = process.env.PORT || '3000'
    
    const server = http.createServer(app)
    
    server.listen(port, () => {
      console.log('Started server on port: ' + port)
    })
}

startServer()