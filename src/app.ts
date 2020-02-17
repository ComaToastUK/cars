import * as bodyParser from 'body-parser'
import express, { Application } from 'express'
import { Controller } from './controllers/Controller'
import { CarController } from './controllers/CarController'


export class AppBuilder {
    private _app: Application
    private _controller: Controller

    constructor() {
        this._controller = new CarController()
        this._app = express()
    }

    public build(): Application {
        this._app.use(bodyParser.json())
        this.registerControllers()
        return this._app
    }

    private registerControllers(): void {
        this._controller.register(this._app)
    }
}