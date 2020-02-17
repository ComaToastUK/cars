import { Car } from '../models/Car'
import { CarService } from './CarService'
import { Guid } from 'guid-typescript'
import { Repository } from '../repositories/Repository'

export class CarServiceImpl implements CarService {
    private _repository: Repository<Car>
    
    constructor(repository: Repository<Car>) {
        this._repository = repository
    }

    public async getCars(): Promise<Car[]> {
        const cars: Car[] = await this._repository.find()
        return cars
    }

    public async getCarById(id: Guid): Promise<Car | null> {
        const car: Car | null = await this._repository.findOne(id)
        return car
    }

    public async createCar(car: Car): Promise<boolean> {
        const result = await this._repository.create(car)
        return result
    }

    public async deleteCar(id: Guid): Promise<boolean> {
        const result = await this._repository.delete(id)
        return result
    }
}
