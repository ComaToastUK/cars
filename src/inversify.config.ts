import 'reflect-metadata'
import { Container } from 'inversify'
import { Controller } from './controllers/Controller'
import { Car } from './models/Car'
import { CarController } from './controllers/CarController'
import { CarService } from './services/CarService'
import { Db } from 'mongodb'
import { Repository } from './repositories/Repository'
import { CarServiceImpl } from './services/CarServiceImpl'
import { CarRepository } from './repositories/CarRepository'

export class Kernel extends Container {
    private _db: Db

    constructor(db: Db) {
        super()
        this._db = db
        this.configure()
    }

    private configure(): void {
        this.bind<Db>('Db').toConstantValue(this._db)
        this.bind<Controller>('Controller').to(CarController)
        this.bind<CarService>('CarService').to(CarServiceImpl)
        this.bind<Repository<Car>>('Repository<Car>').to(CarRepository).whenInjectedInto(CarServiceImpl)
    }
}