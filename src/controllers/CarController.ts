import { Application, Request, Response, NextFunction } from 'express'
import { Controller } from './Controller'
import { Car } from '../models/Car'
import validate from 'express-validation'
import validation from '../validation/carValidation'

export class CarController implements Controller {
    public register(app: Application): void {
        app.route('/cars')
        .post(validate(validation), async (req: Request, res: Response, next: NextFunction) => {
            const body = req.body
            const car = new Car(body.make, body.model, body.colour, body.year)
            res.json(car)
        })
    }
}