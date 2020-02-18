import { Car } from '../models/Car'
import { CarService } from './CarService'
import { Repository } from '../repositories/Repository'
import { injectable, inject } from 'inversify'

@injectable()
export class CarServiceImpl implements CarService {
    private _repository: Repository<Car>
    
    constructor(@inject('Repository<Car>') repository: Repository<Car>) {
        this._repository = repository
    }

    public async getCars(): Promise<Car[]> {
        const cars: Car[] = await this._repository.find()
        return cars
    }

    public async getCarById(id: string): Promise<Car | null> {
        const car: Car | null = await this._repository.findOne(id)
        return car
    }

    public async createCar(car: Car): Promise<boolean> {
        const result = await this._repository.create(car)
        return result
    }

    public async deleteCar(id: string): Promise<boolean> {
        const result = await this._repository.delete(id)
        return result
    }

    public async updateCar(car: Car, id: string): Promise<boolean> {
           return await this._repository.update(car, id)
    }
}
