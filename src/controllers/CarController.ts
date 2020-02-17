import { Application, Request, Response, NextFunction } from 'express'
import { Controller } from './Controller'
import { Car } from '../models/Car'
import validate from 'express-validation'
import validation from '../validation/carValidation'
import { CarService } from '../services/CarService'
import { injectable, inject } from 'inversify'

@injectable()
export class CarController implements Controller {
    private _service: CarService

    constructor(@inject('CarService') service: CarService) {
        this._service = service
    }

    public register(app: Application): void {
        app.route('/cars')
            .post(validate(validation), async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const body = req.body
                    const car = new Car(body.make, body.model, body.colour, body.year)
                    await this._service.createCar(car)
                    return res.json(car)
                } catch (err) {
                    next(err)
                }
            })
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const cars = await this._service.getCars()
                    return res.json(cars)
                } catch (err) {
                    next(err)
                }
            })
        app.route('/cars/:id').get(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const car = await this._service.getCarById(req.params.id)
                return res.json(car)
            } catch (err) {
                next(err)
            }
        })
        .delete(async (req: Request, res: Response, next: NextFunction) => {
            try {
                await this._service.deleteCar(req.params.id)
                return res.status(204)
            } catch (err) {
                next(err)
            }
        })
    }
}