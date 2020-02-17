import { Car } from '../models/Car'
import { Guid } from 'guid-typescript'

export interface CarService {
    getCars(): Promise<Car[]>;
    getCarById(id: Guid): Promise<Car | null>;
    createCar(car: Car): Promise<boolean>;
    deleteCar(id: Guid): Promise<boolean>;
}