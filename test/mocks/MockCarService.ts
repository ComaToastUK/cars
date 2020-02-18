import { Car } from '../../src/models/Car'
import { CarService } from '../../src/services/CarService'
import { injectable } from 'inversify'

@injectable()
export class MockCarService implements CarService {

    public async getCars(): Promise<Car[]> {
        return new Promise<Car[]>(() => [])
    }

    public async getCarById(id: string): Promise<Car> {
        return new Promise<Car>(() => { id })
    }

    public async createCar(car: Car): Promise<boolean> {
        return new Promise<boolean>((res) => {
            if (car) {
                res(true)
            }
        })
    }

    public async updateCar(car: Car, id: string): Promise<boolean> {
        return new Promise<boolean>((res) => {
            if (car && id) {
                res(true)
            }
        })
    }

    public async deleteCar(id: string): Promise<boolean> {
        return new Promise<boolean>((res) => {
            if(id) {
                res(true)
            }
        })
    }
}