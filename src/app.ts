import * as bodyParser from 'body-parser'
import express, { Application } from 'express'
import { Controller } from './controllers/Controller'
import { Container } from 'inversify'

export class AppBuilder {
    private _app: Application
    private _container: Container

    constructor(container: Container) {
        this._container = container
        this._app = express()
    }

    public build(): Application {
        this._app.use(bodyParser.json())
        this.registerControllers()
        return this._app
    }

    private registerControllers(): void {
        const controllers: Controller[] = this._container.getAll<Controller>('Controller')
        controllers.forEach(controller => controller.register(this._app))
    }
}